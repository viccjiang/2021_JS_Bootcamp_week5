let data = [
    {
        "id": 0,
        "name": "肥宅心碎賞櫻3日",
        "imgUrl": "https://images.unsplash.com/photo-1522383225653-ed111181a951?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1655&q=80",
        "area": "高雄",
        "description": "賞櫻花最佳去處。肥宅不得不去的超讚景點！",
        "group": 87,
        "price": 1400,
        "rate": 10
    },
    {
        "id": 1,
        "name": "貓空纜車雙程票",
        "imgUrl": "https://images.unsplash.com/photo-1501393152198-34b240415948?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80",
        "area": "台北",
        "description": "乘坐以透明強化玻璃為地板的「貓纜之眼」水晶車廂，享受騰雲駕霧遨遊天際之感",
        "group": 99,
        "price": 240,
        "rate": 2
    },
    {
        "id": 2,
        "name": "台中谷關溫泉會1日",
        "imgUrl": "https://images.unsplash.com/photo-1535530992830-e25d07cfa780?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80",
        "area": "台中",
        "description": "全館客房均提供谷關無色無味之優質碳酸原湯，並取用八仙山之山冷泉供蒞臨貴賓沐浴及飲水使用。",
        "group": 20,
        "price": 1765,
        "rate": 7
    }
];

// level 1 綁定 ul 列表
const list = document.querySelector(".ticketCard-area");

// 綁定新增套票按鈕
const addBtn = document.querySelector('.addTicket-btn')

// 點擊按鈕，監聽事件
addBtn.addEventListener("click", addData);

// 點擊按鈕，新增套票的資訊 input value 
function addData() {
    // level 3 綁定表單填寫欄位
    const name = document.querySelector('#ticketName');
    const imgUrl = document.querySelector('#ticketImgUrl');
    const area = document.querySelector('#ticketRegion');
    const price = document.querySelector('#ticketPrice');
    const group = document.querySelector('#ticketNum');
    const rate = document.querySelector('#ticketRate');
    const description = document.querySelector('#ticketDescription');

    // 將資料新增到 data 中，依照 data 的資料格式 => 一定要依照物件的 「屬性:值 」的方式新增進去
    data.push({
        id: Date.now(), // 時間戳
        name: name.value,
        imgUrl: imgUrl.value,
        area: area.value,
        price: parseInt(price.value), // input value 都是字串，要轉型, 這裡也可以用 Number()
        group: parseInt(group.value),
        rate: parseInt(rate.value),
        description: description.value
    })

    console.log(data);

    // 按下新增套票按鈕後，表單的value要清空，使用 form 的 這個 reset method
    const form = document.querySelector(".addTicket-form");
    form.reset();

    render(); // 重新渲染
}

// 本次搜尋幾筆資料
function searchNum(cacheData) {
    // console.log(cacheData.length);
    const searchNum = document.querySelector("#searchResult-text");
    console.log(searchNum);
    searchNum.innerHTML = `本次搜尋共 ${cacheData.length} 筆資料`
}

// 初始化
function render(regionData) {
    let str = ""; // 準備組資料
    // 先用 filter 篩選  data 內的資料，用 cacheData 接住篩選後的資料集
    const cacheData = data.filter((item) => { // 箭頭函式 function(item)
        // console.log(item);
        if (regionData == item.area) {
            return item;
        }
        if (!regionData) { // 不是上面選到的
            return item;
        }
    })
    console.log(cacheData);

    // 用篩選完的跑，組資料
    cacheData.forEach(item => {
        str += `<li class="ticketCard">
            <div class="ticketCard-img">
                <a href="#">
                    <img src="${item.imgUrl}" alt="">
            </a>
                    <div class="ticketCard-region">${item.area}</div>
                    <div class="ticketCard-rank">${item.rate}</div>
        </div>
                <div class="ticketCard-content">
                    <div>
                        <h3>
                            <a href="#" class="ticketCard-name">${item.name}</a>
                        </h3>
                        <p class="ticketCard-description">
                            ${item.description}。
                </p>
                    </div>
                    <div class="ticketCard-info">
                        <p class="ticketCard-num">
                            <span><i class="fas fa-exclamation-circle"></i></span>
                            剩下最後 <span id="ticketCard-num"> ${item.group} </span> 組
                </p>
                        <p class="ticketCard-price">
                            TWD <span id="ticketCard-price">${item.price}</span>
                        </p>
                    </div>
                </div>
    </li>`
    })

    list.innerHTML = str;
    searchNum(cacheData)

};
render();




const regionSearch = document.querySelector(".regionSearch");
// console.log(regionSearch);
regionSearch.addEventListener("change", function () {
    console.log(regionSearch.value); // 搜尋欄的值
    render(regionSearch.value); // 帶入搜尋欄選到的值，進行渲染畫面
})