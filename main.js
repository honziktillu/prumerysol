const weights = document.getElementsByClassName("VHHlavicka");
const stoleElement = document.getElementsByClassName('ig_Item igtbl_Item ig_10e26aa4_r1 ig_Header igtbl_Header ig_10e26aa4_r4')[1];

window.onload = () => {
    const weightValues = getWeightValues();
    getResults(weightValues, stoleElement);
}

const getWeightValues = () => {
    let values = [];
    [...weights].map((weight) => {
        if (weight.title.includes("Váha")) {
            let foo = weight.title;
            foo = foo.replace("Váha", "");
            foo = foo.replace("[", "");
            foo = foo.replace("]", "");
            foo = foo.replace(",", ".");
            values.push(parseFloat(foo));
        }
    })
    return values;
}

const getResults = (weightValues, table) => {
    let foo = 0;
    const rows = table.getElementsByTagName("tr");
    [...rows].map((row) => {
        foo++;
        let averageIndex = 0;
        const averages = row.getElementsByClassName("VHDilciPrumer");
        let averageArray = [];
        [...averages].map((item) => {
            if (!item.title) {
                averageIndex++;
                return;
            }
            let itemTitle = item.title;
            itemTitle = itemTitle.replace(",", ".");
            averageArray.push({"index": averageIndex, "value": itemTitle});
            averageIndex++;
        });
        if (!averageArray.length) return;
        const averageResult = calculateAverages(weightValues, averageArray);
        [...rows[foo - 1].getElementsByTagName("td")][0].innerHTML += `<p style="color: red; font-weight: bold;">Průměr: ${averageResult}</p>`;
    });
}

const calculateAverages = (weightValues, array) => {
    console.log(weightValues);
    let foo = 0;
    let fooWeights = 0;
    array.map((item) => {
        let fee = item.value * weightValues[item.index];
        foo += fee;
        fooWeights += weightValues[item.index];
    });
    return (foo / fooWeights).toFixed(2);
}