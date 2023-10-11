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
        const tds = row.getElementsByTagName("td");
        let averageArray = [];
        [...averages].map((item) => {
            if (!item.previousElementSibling.hasAttribute("title")) {
                averageIndex++;
                return;
            }
            let data = [];
            let itemTitle = item.previousElementSibling.title;
            itemTitle = itemTitle.replace(",", ".");
            if (itemTitle.includes(" ")) {
                itemTitle = itemTitle.split(" ");
                data.push(...itemTitle);
            } else {
                data.push(itemTitle);
            }
            averageArray.push({"index": averageIndex, "value": data});
            averageIndex++;
        });
        if (!averageArray.length) return;
        const averageResult = calculateAverages(weightValues, averageArray);
        [...rows[foo - 1].getElementsByTagName("td")][0].innerHTML += `<p style="color: red; font-weight: bold;">Průměr: ${averageResult}</p>`;
    });
}

const calculateAverages = (weightValues, array) => {
    let foo = 0;
    let fooWeights = 0;
    array.map((item) => {
        console.log(item);
        [...item.value].map((mark) => {
            let fee = mark * weightValues[item.index];
            foo += fee;
            fooWeights += weightValues[item.index];
        });
    });
    return (foo / fooWeights).toFixed(2);
}