const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();
const db = admin.firestore();

exports.applyReferral = functions.https.onCall(async (data, context) => {
  if (!context.auth) throw new functions.https.HttpsError('unauthenticated','Login required');

  const uid = context.auth.uid;
  const code = data.code?.toUpperCase();
  if (!code) throw new functions.https.HttpsError('invalid-argument','Referral code required');

  const myRef = db.collection("users").doc(uid);
  const mySnap = await myRef.get();
  if(!mySnap.exists) throw new functions.https.HttpsError('not-found','User profile missing');
  if(mySnap.data().referralUsed) throw new functions.https.HttpsError('failed-precondition','Referral already used');

  const ownerQuery = await db.collection("users").where("referralCode","==",code).get();
  if(ownerQuery.empty) throw new functions.https.HttpsError('not-found','Invalid referral code');
  const ownerDoc = ownerQuery.docs[0];
  if(ownerDoc.id === uid) throw new functions.https.HttpsError('failed-precondition','Cannot use own code');

  const reward = 5;

  await db.runTransaction(async tx => {
    tx.update(myRef, {
      walletBalance: admin.firestore.FieldValue.increment(reward),
      referralUsed: true,
      referredByCode: code
    });

    tx.update(ownerDoc.ref, {
      walletBalance: admin.firestore.FieldValue.increment(reward),
      referralEarnings: admin.firestore.FieldValue.increment(reward)
    });

    tx.set(ownerDoc.ref.collection("referrals").doc(uid), {
      email: mySnap.data().email || null,
      reward,
      date: new Date()
    });
  });

  return { success:true, message:"Referral applied successfully", reward };
});
