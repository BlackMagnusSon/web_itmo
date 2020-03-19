function saveInput(btnID)
{
    let txt = document.getElementById("txt" + btnID.split("btn")[1]);
    let div = document.getElementById("div" + btnID.split("btn")[1]);
    let col = document.getElementById("col" + btnID.split("btn")[1]);
    col.innerText = txt.value;
    div.style = "display: none;";
}
//создание textarea
function createRow(row_num, cols)
{
    let row = document.createElement("tr");
    row.id = "row_" + String(row_num);

    for (let i = 0; i < cols; i++)
    {
        let colID = ["col", String(row_num), String(i + 1)].join("_");
        let txtID = ["txt", String(row_num), String(i + 1)].join("_");
        let divID = ["div", String(row_num), String(i + 1)].join("_");
        let btnID = ["btn", String(row_num), String(i + 1)].join("_");
        let col = document.createElement("td");
        let div = document.createElement("div");
        
        let txt = document.createElement("textarea");
        txt.style.resize = "none";
        txt.id = txtID;
        
        let btn = document.createElement("button");
        btn.type = "button";
        btn.innerText = "Сохранить";
        btn.id = btnID;
        btn.addEventListener("click", function(event) {
            saveInput(this.id);
        });
    
        div.appendChild(txt);
        div.innerHTML += "<br/>";
        div.id = divID;
        div.appendChild(btn);
        
        col.appendChild(div);
        col.id = colID;
        col.style = "border: 1px solid #000; width: 60px; height = 30px;"

        row.appendChild(col);
    }

    return row;
}
//создание таблицы
function createTable(rows, cols)
{
    let table = document.createElement("table");
    table.id = "main_table";
    table.style.border = "1px solid #000";
    table.style.height = String(30 * (rows + 1)) + "px";
    table.style.width = String(60 * (cols + 1)) + "px";
    for (let i = 0; i < rows; i++)
    {
        let row = createRow(i + 1, cols);
        table.appendChild(row);
    }
    
    return table;
}

function createBordersDropdown()
{
    let borderStyles = ["none", "hidden", "dotted", "dashed", "solid", "double", "groove", "ridge", "inset", "outset"];
    let sel = document.createElement("select");
    borderStyles.forEach(function(item) {
        let opt = document.createElement("option");
        opt.value = item;
        opt.innerText = item;
        sel.appendChild(opt);
    });

    return sel;
}
//случайное число
function randomInteger(min, max) 
{
    let rand = min - 0.5 + Math.random() * (max - min + 1);
    return Math.round(rand);
}
//случайный цвет
function getRandomColor() {
    let letters = '0123456789ABCDEF';
    let color = '#';
    for (var i = 0; i < 6; i++) {
      color += randomInteger(0, letters.length - 1);
    }
    return color;
}

function main()
{
    let rows = Number(document.getElementById("i_rows").value);
    let cols = Number(document.getElementById("i_cols").value);
    if (rows == 0 || cols == 0)
    {
        alert("Number of rows and columns can not be 0!");
        return false;
    }

    let creation_div = document.getElementById("create_div");
    creation_div.style = "display: none;";
    
    let table = createTable(rows, cols);
    document.getElementById("main_form").appendChild(table);
    let fb = document.createElement("div");
    fb.id = "func_block";
    
    // Изменение рамки
    let ctb = document.createElement("div");
    ctb.style.float = "left";
    ctb.style.margin = "5px";

    let lbl = document.createElement("label");
    lbl.innerText = "Изменение рамки"

    let thick = document.createElement("input");
    thick.id = "input_thick";
    thick.type = "text";
    thick.value = table.style.width.split("px")[0];
    
    thick.onkeypress = function(event) {
        return (event.keyCode >= 48 && event.keyCode <= 57 && this.value.length <= 2);
    }
    
    thick.onkeyup = function(event) {
        let s = this.value || 0;
        let b = document.getElementById("apply_btn");
        let l = b.innerText.split(" ");
        if (l.length > 1)
        {
            l[1] = s + "px";
            b.innerText = l.join(" ");
        }
        else
        {
            b.innerText = "Apply " + s + "px and border " + document.getElementById("sel_border").value;
        }

    }

    // Изменение рамки
    let sel = createBordersDropdown();
    sel.id = "sel_border";
    sel.onchange = function(event) {
        let b = document.getElementById("apply_btn");
        let l = b.innerText.split(" ");
        if (l.length > 1)
        {
            l[4] = this.value;
            b.innerText = l.join(" ");
        }
        else
        {
            b.innerText = "Apply " + document.getElementById("input_thick").value + "px and border " + this.value;
        }
    };

    btn = document.createElement("button");
    btn.type = "button";
    btn.id = "apply_btn";
    btn.innerText = "Подтвердить";
    btn.addEventListener("click", function(event) {
        let t = document.getElementById("main_table");
        t.style.border = document.getElementById("sel_border").value;
        t.style.borderWidth = document.getElementById("input_thick").value + "px";
    });

    
    ctb.appendChild(lbl);
    ctb.appendChild(document.createElement("br"));
    ctb.appendChild(thick);
    ctb.appendChild(sel);
    ctb.appendChild(document.createElement("br"));
    ctb.appendChild(btn);

    // container замена хедера
    let ah = document.createElement("div");
    ah.style.float = "left";
    ah.style.margin = "5px";
    
    lbl = document.createElement("label");
    lbl.innerText = "Header";

    let inp = document.createElement("input");
    inp.type = "text";
    inp.id = "inp_header";
    inp.value = "SMTH";

    btn = document.createElement("button");
    btn.type = "button";
    btn.innerText = "Изменить Header"
    btn.addEventListener("click", function(event) {
        let headCol = document.getElementById("table_header");
        if (headCol === null)
        {
            let headRow = document.getElementById("main_table").insertRow(0);
            headRow.style.width = document.getElementById("main_table").style.width;
            headRow.style.textAlign = "center";
            headRow.id = "header_row";
            
            headCol = document.createElement("td");
            headCol.style.textAlign = "center";
            headCol.innerText = document.getElementById("inp_header").value;
            headCol.colSpan = document.getElementById("i_cols").value;
            headCol.id = "table_header";
            
            headRow.appendChild(headCol);
        }
        else
        {
            headCol.innerText = document.getElementById("inp_header").value;
        }
        
        
    });

    ah.appendChild(lbl);
    ah.appendChild(document.createElement("br"));
    ah.appendChild(inp);
    ah.appendChild(document.createElement("br"));
    ah.appendChild(btn);

    // Удаление строки
    let rr = document.createElement("div");
    rr.style.float = "left";
    rr.style.margin = "5px";

    lbl = document.createElement("label");
    lbl.innerText = "Удалить строку";

    inp = document.createElement("input");
    inp.type = "text";
    inp.value = "1";
    inp.id = "str2rem";

    btn = document.createElement("button");
    btn.type = "button"
    btn.innerText = "Удалить";

    btn.addEventListener("click", function(event) {
        let tb = document.getElementById("main_table");
        let l = tb.childNodes;
        let i = Number(document.getElementById("str2rem").value);
        if (l[0].id != "header_row")
        {
            i--;
            if (i < 0 || i >= l.length)
            {
                alert("Wrong row index!");
                return;
            }
        }
        else if (i < 1 || i >= l.length)
        {
            alert("Wrong row index!");
            return;
        }

        let r = l[i];
        tb.removeChild(r);
    });

    rr.appendChild(lbl);
    rr.appendChild(document.createElement("br"));
    rr.appendChild(inp);
    rr.appendChild(document.createElement("br"));
    rr.appendChild(btn);

    // Mагия
    let mgc = document.createElement("div");
    mgc.style.float = "left";
    mgc.style.margin = "5px";

    lbl = document.createElement("label");
    lbl.innerText = "Магия";

    btn = document.createElement("button");
    btn.type = "button";
    btn.innerText = "Magic";
    btn.addEventListener("click", function(event) {
        let chc = randomInteger(1, 4);
        
        let l = document.getElementById("main_table").childNodes;
        let lowRowIndex = l[0].id == "header_row" ? 1 : 0;
        let highRowIndex = l.length - 1;
        let rw = randomInteger(lowRowIndex, highRowIndex);

        let cl = l[rw].childNodes;
        let ci = randomInteger(0, cl.length - 1);
        let c = cl[ci];

        if (chc > 2)
        {
            getRandomColor();
            randomInteger();
            c.style.background = getRandomColor();
            c.style.fontSize = String(randomInteger(15, 25)) + "px";
        }
        else
        {
            let colID = c.id.split("col");
            let txtID = colID.join("txt");
            let btnID = colID.join("btn");
            let divID = colID.join("div");

            let div = document.createElement("div");
            let txt = document.createElement("textarea");
            txt.style.resize = "none";
            txt.id = txtID;
            
            let btn = document.createElement("button");
            btn.type = "button";
            btn.innerText = "Схранить";
            btn.id = btnID;
            btn.addEventListener("click", function(event) {
                saveInput(this.id);
            });
        
            div.appendChild(txt);
            div.innerHTML += "<br/>";
            div.id = divID;
            div.appendChild(btn);

            c.innerText = "";
            c.appendChild(div);
        }  
    });

    mgc.appendChild(lbl);
    mgc.appendChild(document.createElement("br"));
    mgc.appendChild(btn);



    //Очистка таблицы
    let rt = document.createElement("div");
    rt.style.float = "left";
    rt.style.margin = "5px";
    

    btn = document.createElement("button");
    btn.type = "submit";
    btn.innerText = "Очистить таблицу";   

    btn.addEventListener("click", function(event) {
        document.getElementById("create_div").style.display = "block";
        document.body.removeChild(document.getElementById("func_block"));
        let mf = document.getElementById("main_form");
        mf.removeChild(document.getElementById("main_table"));
        let script = document.getElementById("creation_script");
        document.body.removeChild(script);
    });

    rt.appendChild(btn);

    fb.appendChild(ctb);
    fb.appendChild(ah);
    fb.appendChild(rr);
    fb.appendChild(mgc);
    fb.appendChild(rt);

    document.body.appendChild(fb);

    
}