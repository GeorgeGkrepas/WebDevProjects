import { useEffect, useState } from "react"
import { Doughnut } from "react-chartjs-2"
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from "chart.js";
import type { ChartData, ChartOptions } from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { auth, listenToReviews } from "./firebase";

ChartJS.register(ArcElement, Tooltip, Legend, Title, ChartDataLabels);

const categoryColors: Record<string, string> = {
    "🍕Pizza": "#FF6B6B",
    "🍝Pasta": "#F5DEB3",
    "🍔Burgers": "#FFA500",
    "🍜Noodles": "#FFD700",
    "🍣Sushi": "#FF69B4",
    "🍰Desserts": "#DA70D6",
    "🍗Fried Chicken": "#FF8C00",
    "🥪Sandwiches": "#F4A460",
    "🥗Salads": "#32CD32",
    "🍖BBQ": "#8B0000",
    "🌮Tacos": "#FFA07A",
    "☕Coffee": "#6F4E37",
    "🍹Drinks": "#00CED1"
};

export const AnalyticsSection = () => {

    const [categoryChartData, setCategoryChartData] = useState<ChartData<"doughnut">>({
        labels: [],
        datasets: [{ data: [], backgroundColor: [] }]
    });
    const [ratingChartData, setRatingChartData] = useState<ChartData<"doughnut">>({
        labels: ["5⭐", "4⭐", "3⭐", "2⭐", "1⭐"],
        datasets: [{ data: [0, 0, 0, 0, 0], backgroundColor: ["#FFD700", "#F2C94C","#E0C36A","#D9D2A6","#F3F0E0"] }]
    });
    const [totalReviews, setTotalReviews] = useState(0);

    useEffect(() => {
            const user = auth.currentUser;
            if (!user) return;

            const unsubscribe = listenToReviews(user.uid, (reviews) => {
                const categoryCounts: Record<string, number> = {};
                const ratingCounts: Record<string, number> = {
                "5⭐": 0,
                "4⭐": 0,
                "3⭐": 0,
                "2⭐": 0,
                "1⭐": 0,
                };
                

            reviews.forEach(review => {
                const categories = review.category.split(",").map((c: string) => c.trim());
                categories.forEach((category: string) => {
                    categoryCounts[category] = (categoryCounts[category] || 0) + 1;
                });

                const key = `${review.rating}⭐`;
                if (key in ratingCounts) {
                    ratingCounts[key] += 1;
                }
            });

            setTotalReviews(reviews.length);

            if (reviews.length === 0) { // Handle case with no reviews to avoid empty charts
                setCategoryChartData({
                    labels: [],
                    datasets: [{ data: [], backgroundColor: [] }]
                });

                setRatingChartData({
                    labels: [],
                    datasets: [{ data: [], backgroundColor: [] }]
                });

                return;
            }

            const categoryLabels = Object.keys(categoryCounts);
            const categoryData = Object.values(categoryCounts);
            const backgroundColor = categoryLabels.map(label => categoryColors[label] || "#000000");
            setCategoryChartData({ labels: categoryLabels, datasets: [{ data: categoryData, backgroundColor }] });

            const ratingColorMap: Record<string, string> = {
                "5⭐": "#FFD700",
                "4⭐": "#F2C94C",
                "3⭐": "#E0C36A",
                "2⭐": "#D9D2A6",
                "1⭐": "#F3F0E0",
            };

                // Remove ratings with no entries
                const ratingEntries = Object.entries(ratingCounts)
                .filter(([, count]) => count > 0);
 
                if (ratingEntries.length === 0) {
                setRatingChartData({
                    labels: ["No ratings yet"],
                    datasets: [{ data: [1], backgroundColor: ["#E5E7EB"] }],
                });
                    return;
                }

                setRatingChartData({
                labels: ratingEntries.map(([label]) => label),
                datasets: [
                    {
                    data: ratingEntries.map(([, count]) => count),
                    backgroundColor: ratingEntries.map(
                        ([label]) => ratingColorMap[label]
                    ),
                    },
                ],
                });
        });

        return () => unsubscribe();
    }, []);

    const categoryChartOptions: ChartOptions<"doughnut"> = {
        cutout: "70%",
        responsive: true,
        plugins: {
            title: {
                display: true,
                text: 'Reviews by Category',
                font: {
                    size: 18,
                    weight: 'bold',
                },
            },
            datalabels: {
            display: true,
            formatter: (value: number, ctx: any) => {
                const data = ctx.chart.data.datasets[0].data as number[];
                const total = data.reduce((a, b) => a + b, 0);
                const percentage = ((value / total) * 100).toFixed(1);
                return `${percentage}%`;
            },
            color: "#000",
            font: {
                weight: "bold",
                size: 14,
            },
            },
            legend: {
                position: "bottom",
            },
        },
    }

    const ratingChartOptions: ChartOptions<"doughnut"> = {
        cutout: "70%",
        responsive: true,
        plugins: {
            title: {
                display: true,
                text: 'Reviews by Rating',
                font: {
                    size: 18,
                    weight: 'bold',
                },
            },
            datalabels: {
            display: true,
            formatter: (value: number, ctx: any) => {
                const data = ctx.chart.data.datasets[0].data as number[];
                const total = data.reduce((a, b) => a + b, 0);
                const percentage = ((value / total) * 100).toFixed(1);
                return `${percentage}%`;
            },
            color: "#000",
            font: {
                weight: "bold",
                size: 14,
            },
            },
            legend: {
                position: "bottom",
            },
        },
    }
    
    return (
        <>
            <h1 className="text-3xl font-bold mt-5 text-center w-full underline">Analytics Dashboard</h1>
            <div className="flex min-h-[calc(100vh-8rem)] items-center justify-center p-8">
                <div className="flex flex-row items-center justify-between w-full max-w-6xl">
                    {/*Reviews by Category Chart */}
                    {totalReviews === 0 ? (
                        <div className="flex items-center justify-center p-4 bg-white border border-gray-300 rounded shadow max-w-sm max-h-96 w-full h-96">
                            <p className="text-lg font-semibold text-gray-500">
                                No reviews yet 🍽️
                            </p>
                        </div>
                    ) : (
                    <Doughnut
                        className="p-4 bg-white border border-gray-300 rounded shadow max-w-sm max-h-96"
                        data={categoryChartData}
                        options={categoryChartOptions}
                    />
                    )}

                    {/* Total Reviews */}
                    <div className="flex flex-col items-center justify-center p-6 bg-white border border-gray-300 rounded shadow w-36 h-36">
                        <p className="text-xl text-center text-black font-bold underline">Total Reviews</p>
                        <span className="text-3xl font-bold">{totalReviews}</span>
                    </div>

                    {/* Reviews by Rating Chart */}
                    {totalReviews === 0 ? (
                        <div className="flex items-center justify-center p-4 bg-white border border-gray-300 rounded shadow max-w-sm max-h-96 w-full h-96">
                            <p className="text-lg font-semibold text-gray-500">
                                No reviews yet 🍽️
                            </p>
                        </div>
                    ) : (
                    <Doughnut
                        className="p-4 bg-white border border-gray-300 rounded shadow max-w-sm max-h-96"
                        data={ratingChartData}
                        options={ratingChartOptions}
                    />
                    )}
                </div>
            </div>
        </>
    )
}
