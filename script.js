$(function(){
    $(" tr:eq(1) input").each(function(){
        if($(this).attr("class") != "result") $(this).attr("id","variable");
    });
});

window.onload = function(){

    var Entopy = 0;
    var row = $(" tr").length - 1;
    var column = [];
    var tree=[];

    Entopy = EntopyCalculate(" .result",row);
    $(" #calcu").click(function(){
    $(" #variable").each(function(){
        $("."+$(this).attr("class")).each(function(){
            column[$(this).attr("class")] = GainCalculate("."+$(this).attr("class"),".result",Entopy,row);
        });
    });

    tree.push(highestValue(column));
    $("."+highestValue(column)+":eq(0)").removeAttr('id');

    ////////////////check child node

    var rootnode = highestValue(column);
    var rootnodeType = TypeOfValue("."+rootnode);
    var rootnodeFetch = fetchColumn("."+rootnode);
    var rootnodeNumber = NumberOfType("."+rootnode);
    var resultColumn = fetchColumn(" .result");
    var resultType = TypeOfValue(" .result");
    var count = 0;

        for(var x in rootnodeType){
            for(var y in resultColumn){
                if(resultColumn[y] == "none"){
                    if(rootnodeType[x] == rootnodeFetch[y]) count++;
                }
            }
            if(count==rootnodeNumber[x]) tree.push("==>"+rootnodeType[x]+"==>none");
            else if(count==0) tree.push("==>"+rootnodeType[x]+"==>sunburn");
            else{

                tree.push("==>"+rootnodeType[x]+"==>");

                var entop = 0;
                entop += info(count,rootnodeNumber[x]);
                entop += info(rootnodeNumber[x]-count,rootnodeNumber[x]);

                var coll = [],gainn1 = 0,countnode = 0;
                ///////////////////
                for(var i in rootnodeFetch) if(rootnodeFetch[i] == rootnodeType[x]) countnode++;
                $(" #variable").each(function(){

                    var classname =  "."+$(this).attr("class");
                    var typeheight = TypeOfValue(classname);
                    var fetchHeight = fetchColumn(classname);
                    var nodefetchcolumn = fetchColumn(" ."+rootnode);
                    var cc = 0,cc2 = 0;

                    for(var zz in typeheight){
                        for(var xx in nodefetchcolumn){
                            if(nodefetchcolumn[xx]==rootnodeType[x]){
                                if(typeheight[zz]==fetchHeight[xx])cc++;
                            }
                            if(resultColumn[xx]=="none"&&nodefetchcolumn[xx]==rootnodeType[x]){
                                if(typeheight[zz]==fetchHeight[xx])cc2++;
                            }
                        }
                        gainn1 += (cc/countnode)*(info(cc2,cc)+info(cc-cc2,cc));
                        cc=0;
                        cc2=0;
                    }
                    gainn1 = entop - gainn1;
                    coll[$(this).attr("class")] = gainn1;
                    gainn1 = 0;
                });
            }
            count= 0;
        }

        for(var e in coll){
            alert(e+"="+coll[e]);
        }

        //Display
        for(var ii in tree){
            $(" #result").append(tree[ii]+"<br>");
        }

    });
};
function unacceptNode(){



}
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