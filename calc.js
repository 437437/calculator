// 上の枠に表示されるもの
var result = "";
// =で計算したかどうか
var is_calc = false;

// 初期表示
window.onload = function () {
  result = document.getElementById('result');
};

// Cキーが押されたら表示を0に戻してfalseにする
function c_click(){
  result.value = "0";
  is_calc = false;
}

// 数字キーを押すと末尾に追加して表示
function num_click(val){
  if(is_calc)  result.value = "0"; 
  is_calc = false; 

  if(result.value =="0" && val == "0"){
    result.value = "0";
  }else if(result.value == "0" && val == "."){
    result.value = "0.";
  }else if(result.value == "0"){
    result.value = val;
  }else{
    result.value += val;
  }
}

// 演算子キーを押すと
function ope_click(val){
  if(is_calc)  is_calc = false;

  //末尾に追加して表示
  if(is_ope_last()){
    result.value = result.value.slice(0, -1) + val;
    result.value = result.value.replaceAll("√", "**0.5");
  } else {
    result.value += val;
    result.value = result.value.replaceAll("√", "**0.5");
  }
}

// =キークリック
function equal_click(){
  if(is_ope_last())  result.value = result.value.slice(0, -1);

  //×、÷、2乗、ルートは置き換えた上で計算する
  var temp = new Function("return " + result.value.replaceAll("×", "*").replaceAll("÷", "/").replaceAll("^", "**").replaceAll("√", "**0.5"))();
  //無限になる場合はエラー
  if(temp == Infinity || Number.isNaN(temp)){
    result.value = "Error";
  //それ以外の場合は結果を表示
  }else{
    result.value = temp;
    is_calc = true;
  }
}

// 入力されている値が演算子かどうか
function is_ope_last(){
  return ["+","-","×","÷","^","√"].includes(result.value.toString().slice(-1));
}