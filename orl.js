class OrderedList extends Array {
    // 使用二分搜尋找到插入新元素的位置 (根據年齡排序)
    _binarySearch(element) {
      let low = 0;
      let high = this.length - 1;
  
      while (low <= high) {
        const mid = Math.floor((low + high) / 2);
        if (this[mid].age === element.age) {
          return mid; // 找到相同年齡的位置
        } else if (this[mid].age < element.age) {
          low = mid + 1; // 繼續搜尋右半部分
        } else {
          high = mid - 1; // 繼續搜尋左半部分
        }
      }
  
      return low; // 返回適合插入的位置
    }
  
    // 添加新元素並保持有序
    add(name, age) {
      const element = { name, age };
      const index = this._binarySearch(element);
      this.splice(index, 0, element); // 插入新元素
    }
  
    // 搜尋名字或年齡是否包含特定單字或數字
    searchByKeyword(keyword) {
      if (isNaN(keyword)) {
        // 關鍵字是文字，搜尋名字
        return this.filter((item, index) => item.name.includes(keyword)).map((item, index) => ({
          index,
          ...item
        }));
      } else {
        // 關鍵字是數字，搜尋年齡
        const age = parseInt(keyword, 10);
        return this.filter((item, index) => item.age === age).map((item, index) => ({
          index,
          ...item
        }));
      }
    }
  }
  
  // 測試 OrderedList 類
  const orderedList = new OrderedList();
  const readline = require("readline");
  
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  
  function showMenu() {
    console.log("\n選單:");
    console.log("1. 新增名字和年齡");
    console.log("2. 搜尋名字或年齡");
    console.log("3. 顯示目前名單");
    console.log("4. 離開");
  }
  
  function handleInput(input) {
    switch (input.trim()) {
      case "1":
        rl.question("輸入名字 (只能是文字): ", (name) => {
          if (!/^[a-zA-Z]+$/.test(name)) {
            console.log("名字無效，請重新輸入。");
            handleInput("1");
            return;
          }
          rl.question("輸入年齡 (只能是數字): ", (age) => {
            if (isNaN(age)) {
              console.log("年齡無效，請重新輸入。");
              handleInput("1");
              return;
            }
            orderedList.add(name, parseInt(age, 10));
            console.log(`已新增: {名字: ${name}, 年齡: ${age}}`);
            showMenu();
          });
        });
        break;
      case "2":
        rl.question("輸入搜尋的關鍵字 (名字或年齡): ", (keyword) => {
          if (/^[a-zA-Z]+$/.test(keyword) || !isNaN(keyword)) {
            const results = orderedList.searchByKeyword(keyword);
            if (results.length > 0) {
              console.log("搜尋結果:");
              results.forEach((item) => {
                console.log(`索引: ${item.index}, 名字: ${item.name}, 年齡: ${item.age}`);
              });
            } else {
              console.log("沒有找到符合的結果。");
            }
          } else {
            console.log("輸入無效，請重新輸入名字或年齡。");
          }
          showMenu();
        });
        break;
      case "3":
        console.log("目前名單:");
        orderedList.forEach((item, index) => {
          console.log(`索引: ${index}, 名字: ${item.name}, 年齡: ${item.age}`);
        });
        showMenu();
        break;
      case "4":
        console.log("已退出程式。");
        rl.close();
        break;
      default:
        console.log("無效的選項，請重新輸入。");
        showMenu();
    }
  }
  
  showMenu();
  rl.on("line", handleInput);
  