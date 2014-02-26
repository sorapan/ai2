

window.onload = function(){

    var Entopy = 0;
    var row = $(" tr").length - 1;

    Entopy = EntopyCalculate(" .result",row);
    alert(Entopy);

};

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
 * @param column
 * @returns {Array}
 */
function NumberOfType(column){

    var count = 0,result = [];
    var resultType = TypeOfValue(column);
    for(var x in resultType){
        $(column).each(function(){ if(resultType[x] == $(this).val()) count++; });
        result.push(count);
        count=0;
    }
    return result;

}
/**
 *
 * @param column
 * @param row
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
 * @param resultNumber
 * @param row
 * @returns {number}
 */
function info(resultNumber,row){

    var info = -(resultNumber/row)*Math.log2(resultNumber/row);
    return info;

}