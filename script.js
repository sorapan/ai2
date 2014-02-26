


window.onload = function(){

    var Entopy = 0;
    var row = $(" tr").length - 1;

    var resultType = TypeOfValue(" .result");

    alert(NumberOfType(" .result"));
    alert(resultType);


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

function infoCalculate(){



}