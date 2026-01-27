const ctx = document.getElementById("earningsChart");

new Chart(ctx, {
  type: "line",
  data: {
    labels: ["Day 1","Day 2","Day 3","Day 4","Day 5","Day 6","Day 7"],
    datasets: [{
      data: [2,5,8,12,18,25,32],
      borderColor: "#d4af37",
      backgroundColor: "rgba(212,175,55,0.15)",
      fill: true,
      tension: 0.4
    }]
  },
  options: {
    responsive: true,
    plugins: { legend: { display: false } },
    scales: { y: { beginAtZero: true } }
  }
});
