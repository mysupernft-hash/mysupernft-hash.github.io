/* Chart container styling */
.chart-container {
    width: 100%;        /* Full width of parent */
    max-width: 600px;   /* Optional max width */
    height: 300px;      /* Fixed height */
    background: #0f172a; /* Dashboard theme background */
    padding: 15px;
    border-radius: 12px;
    margin: 15px auto;   /* Center horizontally */
    box-sizing: border-box;
}

/* Optional: make canvas fill the container */
.chart-container canvas {
    width: 100% !important;
    height: 100% !important;
}

<script>
const ctx=document.getElementById("earningsChart");
const chart=new Chart(ctx,{
  type:"line",
  data:{
    labels:["Day 1","Day 2","Day 3","Day 4","Day 5","Day 6","Day 7"],
    datasets:[{
      label:"Earnings",
      data:[2,5,8,12,18,25,32],
      borderColor:"#38bdf8",
      backgroundColor:"rgba(56,189,248,0.1)",
      fill:true,
      tension:0.4
    }]
  },
  options:{
    responsive:true,
    plugins:{legend:{display:false}},
    scales:{y:{beginAtZero:true}}
  }
});
</script>
