interface StepsAnalysis {
    totalSteps: number;        // Tổng số bước trong tuần
    averageSteps: number;      // Trung bình mỗi ngày
    bestDay: number;           // Số bước cao nhất
    worstDay: number;          // Số bước thấp nhất
    daysAboveTarget: number;   // Số ngày đạt mục tiêu
    streak: number;            // Số ngày liên tiếp đạt mục tiêu
}

function analyzeSteps(dailySteps: number[], target: number = 10000): StepsAnalysis {

    const totalSteps: number = dailySteps.reduce((total, curValue) => total + curValue, 0);
    const averageSteps: number = Math.floor(totalSteps / dailySteps.length);
    const bestDay: number = Math.max(...dailySteps);
    const worstDay: number = Math.min(...dailySteps);
    const daysAboveTarget: number = dailySteps.filter((item) => item >= target).length;
    let streak: number = 0;
    let currentCount = 0;
    dailySteps.forEach((item) => {
        if (item >= target) {
            currentCount++;
        } else {
            currentCount = 0;
        }

        if (currentCount > streak) {
            streak = currentCount;
        }
    });

    return {
        totalSteps,
        averageSteps,
        bestDay,
        worstDay,
        daysAboveTarget,
        streak
    };
}

console.log(analyzeSteps([12000, 11000, 9000, 8000, 10500, 7000, 11500]));
console.log(analyzeSteps([5000, 6000, 7000, 5500, 4000, 3000, 2000]));
console.log(analyzeSteps([10000, 10000, 10000, 10000, 10000, 10000, 10000]));

