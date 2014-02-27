$(function(){
    $(" input").each(function(){

        if($(this).attr("class") != "result") $(this).attr("id","variable");

    });

});

window.onload = function(){

    var Entopy = 0;
    var row = $(" tr").length - 1;
    var node = [];

    Entopy = EntopyCalculate(" .result",row);

    node['hair'] = GainCalculate(".hair",".result",Entopy,row);
    node['height'] = GainCalculate(".height",".result",Entopy,row);
    node['weight'] = GainCalculate(".weight",".result",Entopy,row);
    node['lotion'] = GainCalculate(".lotion",".result",Entopy,row);
    node['gender'] = GainCalculate(".gender",".result",Entopy,row);

    alert(highestValue(node));

};
/**
 *
 * @param arr
 * @returns {key}
 */
function highestValue(arr){

    var value = 0,key = 0;
    for(var i in arr){
        if(arr[i] > value){
            value = arr[i];
            key = i;
        }
    }
    return key;

}
/**
 *
 * @param column
 * @returns {Array}
 */
function fetchColumn(column){

    var arr=[];
    $(column).each(function(){ arr.push($(this).val()); });
    return arr;

}
/**
 *
 * @param column = classname
 * @returns {Array}
 */
function TypeOfValue(column){

    var arr = [],kindarr = [];
    $(column).each(function(){ arr.push($(this).val()); });
    arr = arr.sort();
    for(var i=0;i<arr.length;i++)if(arr[i]!=arr[i+1]) kindarr.push(arr[i]);
    return kindarr;

}
/**
 *
 * @param column = classname
 * @returns {Array}
 */
function NumberOfType(column){

    var count = 0,result = [],resultType = TypeOfValue(column);
    for(var x in resultType){
        $(column).each(function(){ if(resultType[x] == $(this).val()) count++; });
        result.push(count);
        count=0;
    }
    return result;
}
/**
 *
 * @param column = classname
 * @param row = row number
 * @returns {number}
 */
function EntopyCalculate(column,row){

    var Entopy = 0;
    var resultType = TypeOfValue(column);
    var resultNumber = NumberOfType(column);
    for(var x in resultType) Entopy += info(resultNumber[x],row);
    Entopy = Entopy.toFixed(2);
    return Entopy;

}
/**
 *
 * @param column
 * @param resultcolumn
 * @param Entopy
 * @param row
 * @returns {number}
 */
function GainCalculate(column,resultcolumn,Entopy,row){

    var Type = TypeOfValue(column);
    var Number = NumberOfType(column);
    var fetch = fetchColumn(column);
    var resultfetch = fetchColumn(resultcolumn);
    var gain = 0,count = 0;
    for(var x in Type){
        for(var z in resultfetch){
            if(resultfetch[z] == "none"){
                if(Type[x] == fetch[z])count++;
            }
        }
        gain += (Number[x]/row)*(info(count,Number[x])+info(Number[x]-count,Number[x]));
        count = 0;
    }
    gain = (Entopy-gain).toFixed(2);
    return gain;

}
/**
 *
 * @param resultNumber
 * @param row
 * @returns {number}
 */
function info(resultNumber,row){

    if(resultNumber > 0){

        var info = -(resultNumber/row)*Math.log2(resultNumber/row);
        return info;

    }else{

        return 0;

    }

}