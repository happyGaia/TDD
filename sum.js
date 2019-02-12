function sum(budgetInfo, durationDate) {
    var days = 0;
    var budgetPerDay = 0;
    var finalBudget = 0;
    var durationDataNoMatchValue = 0;
    var daysOfPerMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    // make sure budgetMother and durationDate is same month
    if (budgetInfo !== undefined && durationDate !== undefined) {
        for (var i = 0; i < budgetInfo.length; i++) {
            var resetData = getDurationDate(durationDate, budgetInfo[i].budgetMonth, daysOfPerMonth);
            if (resetData === 0) {
                finalBudget = 0;
            } else {
                // getDays
                days = getDays(resetData.start, resetData.end);
                budgetPerDay = getBudgetPerDay(budgetInfo[i].budgetMonth, budgetInfo[i].budget, daysOfPerMonth);
                finalBudget = finalBudget + (days * budgetPerDay);
            }
        }
    }

    return finalBudget;
}

function getDurationDate(durationDate, budgetMonth, daysOfPerMonth) {
    var tempBudgetPerDay = parseInt(budgetMonth.split('-')[1]);
    var tempDurationDate = { 'start': durationDate.start, 'end': durationDate.end };
    var tempStartMonth = parseInt(tempDurationDate.start.split('-')[1]);
    var tempEndMonth = parseInt(tempDurationDate.end.split('-')[1]);
    if (tempDurationDate.start.search(budgetMonth) !== -1 && tempDurationDate.end.search(budgetMonth) !== -1) {
        return tempDurationDate;
    } else if (tempDurationDate.start.search(budgetMonth) !== -1) {
        var lastDate = daysOfPerMonth[tempBudgetPerDay - 1];
        //reset duration end date
        var startDate = tempDurationDate.start.split('-');
        tempDurationDate.end = startDate[0] + '-' + startDate[1] + '-' + lastDate;
        return tempDurationDate
    } else if (tempDurationDate.end.search(budgetMonth) !== -1) {
        //reset duration start date
        var endDate = tempDurationDate.end.split('-');
        tempDurationDate.start = endDate[0] + '-' + endDate[1] + '-01';
        return tempDurationDate
    } else if ((tempStartMonth < tempBudgetPerDay) && (tempBudgetPerDay < tempEndMonth)) {
        tempDurationDate.start = budgetMonth + '-01';
        tempDurationDate.end = budgetMonth + '-' + daysOfPerMonth[tempBudgetPerDay - 1];
        return tempDurationDate
    } else {
        return 0;
    }
}

function setStartEndDate() {

}

function getBudgetPerDay(budgetMonth, budget, daysOfPerMonth) {
    var budgetPerDay = budgetMonth.split('-');
    return (budget / daysOfPerMonth[parseInt(budgetPerDay[1]) - 1]);
}

function getDays(stratDateStr, endDateStr) {
    var sdate = new Date(stratDateStr);
    var now = new Date(endDateStr);
    var days = now.getTime() - sdate.getTime();
    var day = parseInt(days / (1000 * 60 * 60 * 24));
    var day = day + 1;
    return day;
}

module.exports = sum;