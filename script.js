const day = document.querySelector("#day-number");
const month = document.querySelector("#month-number");
const year = document.querySelector("#year-number");

const daysOfMonth = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

function monthsCompare() {
    const enteredDay = parseInt(day.value);
    const enteredMonth = parseInt(month.value);
    const enteredYear = parseInt(year.value);
    const monthLastYear = 12 - enteredMonth;

    const currentDay = getCurrentDay();
    const currentMonth = getCurrentMonth();
    const currentYear = getCurrentYear();

    emptyInput(day, month, year);
    const isValid = inputCheck(
        enteredDay,
        enteredMonth,
        enteredYear,
        currentYear
    );

    if (isValid === true) {
        clearField();
        if (enteredDay > currentDay) {
            const remainingDays = daysOfMonth[enteredMonth - 1] - enteredDay;
            const finalDay = currentDay + remainingDays;
            document.querySelector(".dashDays").innerHTML = finalDay;
            if (enteredMonth >= currentMonth) {
                const finalMonth = monthLastYear + currentMonth - 1;
                document.querySelector(".dashMonths").innerHTML = finalMonth;
            } else if (enteredMonth < currentMonth) {
                const finalMonth = currentMonth - enteredMonth - 1;
                document.querySelector(".dashMonths").innerHTML = finalMonth;
            }
        } else if (enteredDay < currentDay) {
            const finalDay = currentDay - enteredDay;
            document.querySelector(".dashDays").innerHTML = finalDay;
            if (enteredMonth > currentMonth) {
                const finalMonth = monthLastYear + currentMonth;
                document.querySelector(".dashMonths").innerHTML = finalMonth;
            } else if (enteredMonth <= currentMonth) {
                const finalMonth = currentMonth - enteredMonth;
                document.querySelector(".dashMonths").innerHTML = finalMonth;
            }
        } else if (enteredDay === currentDay) {
            document.querySelector(".dashDays").innerHTML = 0;
            if (enteredMonth > currentMonth) {
                const finalMonth = monthLastYear + currentMonth;
                document.querySelector(".dashMonths").innerHTML = finalMonth;
            } else if (enteredMonth === currentMonth) {
                document.querySelector(".dashMonths").innerHTML = 0;
            } else {
                const finalMonth = currentMonth - enteredMonth + 1;
                document.querySelector(".dashMonths").innerHTML = finalMonth;
            }
        }

        if (currentMonth < enteredMonth) {
            const finalYear = currentYear - enteredYear - 1;
            document.querySelector(".dashYears").innerHTML = finalYear;
        } else if (currentMonth >= enteredMonth) {
            const finalYear = currentYear - enteredYear;
            document.querySelector(".dashYears").innerHTML = finalYear;
        }
    } else {
        console.log("invalid");
    }
}

function buttonClicked() {
    monthsCompare();
}

function getCurrentDay() {
    const currentDay = new Date().getDate();
    return currentDay;
}

function getCurrentMonth() {
    const currentMonth = new Date().getMonth() + 1;
    return currentMonth;
}

function getCurrentYear() {
    const currentYear = new Date().getFullYear();
    return currentYear;
}

function inputCheck(enteredDay, enteredMonth, enteredYear, currentYear) {
    let isValid = true;
    if (enteredMonth <= 12 && enteredMonth > 0) {
        if (enteredDay > daysOfMonth[enteredMonth - 1]) {
            isValid = false;
            redFieldDay(day);
            document.querySelector(".error-day").innerHTML =
                "Must be a valid day";
        }
    } else {
        isValid = false;
        redFieldMonth(month);

        if (month.value === "") {
            document.querySelector(".error-month").innerHTML =
                "This field is required";
        } else {
            document.querySelector(".error-month").innerHTML =
                "Must be a valid month";
        }
        if (enteredDay > 31) {
            redFieldDay(day);
            document.querySelector(".error-day").innerHTML =
                "Must be a valid day";
        }
    }

    if (enteredYear > currentYear) {
        isValid = false;
        redFieldYear(year);
        document.querySelector(".error-year").innerHTML =
            "Must be a valid year";
    }
    return isValid;
}

function emptyInput(day, month, year) {
    if (day.value === "") {
        redFieldDay(day);
        document.querySelector(".error-day").innerHTML =
            "This field is required";
    }

    if (month.value === "") {
        redFieldMonth(month);
        document.querySelector(".error-month").innerHTML =
            "This field is required";
    }

    if (year.value === "") {
        redFieldYear(year);
        document.querySelector(".error-year").innerHTML =
            "This field is required";
    }
}

function redFieldDay(day) {
    document.querySelector(".invalid-day").style.color = "red";
    document.querySelector("#day-number").style.borderColor = "red";
    document.querySelector(".error-day").style.visibility = "visible";
}

function redFieldMonth(month) {
    document.querySelector(".invalid-month").style.color = "red";
    document.querySelector("#month-number").style.borderColor = "red";
    document.querySelector(".error-month").style.visibility = "visible";
}

function redFieldYear(year) {
    document.querySelector(".invalid-year").style.color = "red";
    document.querySelector("#year-number").style.borderColor = "red";
    document.querySelector(".error-year").style.visibility = "visible";
}

function clearField() {
    document.querySelector(".invalid-day").style.color = "hsl(0, 1%, 44%)";
    document.querySelector("#day-number").style.borderColor = "hsl(0, 0%, 86%)";
    document.querySelector(".error-day").style.visibility = "hidden";

    document.querySelector(".invalid-month").style.color = "hsl(0, 1%, 44%)";
    document.querySelector("#month-number").style.borderColor =
        "hsl(0, 0%, 86%)";
    document.querySelector(".error-month").style.visibility = "hidden";

    document.querySelector(".invalid-year").style.color = "hsl(0, 1%, 44%)";
    document.querySelector("#year-number").style.borderColor =
        "hsl(0, 0%, 86%)";
    document.querySelector(".error-year").style.visibility = "hidden";
}
