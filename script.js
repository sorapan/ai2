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

        tree=[];
        $(" #result").html("");

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

                tree.push("==>"+rootnodeType[x]+"");

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
                        gainn1+=(cc/countnode)*(info(cc2,cc)+info(cc-cc2,cc));
                        cc=0;
                        cc2=0;
                    }
                    gainn1 = entop - gainn1;
                    coll[$(this).attr("class")] = gainn1;
                    gainn1 = 0;
                });

                var node2 = highestValue(coll);
                tree.push("------>"+node2+"");
                $("."+node2+":eq(0)").removeAttr('id');

                var node2Type = TypeOfValue("."+node2);
                var node2Fetch = fetchColumn("."+node2);
                var node2Number = NumberOfType("."+node2);
                var keynode2 = [],ccee = 0,god= 0;


                for(var ee in resultColumn){
                    if(rootnodeFetch[ee] == rootnodeType[x]){
                        keynode2.push(ee);
                    }
                }

                for(var bb in node2Type){
                    for(var ww in keynode2){
                        if(node2Fetch[keynode2[ww]] == node2Type[bb]){
                            god++;
                            if(resultColumn[keynode2[ww]] == "none")ccee++;
                        }
                    }
                    if(ccee==god) tree.push("------>"+node2Type[bb]+"==>none");
                    else if(ccee==0) tree.push("------>"+node2Type[bb]+"==>sunburn");
                    else{
/////////////////////////////////////////////////////////////////////////////////////////////
                        tree.push("------>"+node2Type[bb]+"");

                        var entop2 = 0;
                        entop2 += info(ccee,node2Number[bb]);
                        entop2 += info(node2Number[bb]-count,node2Number[bb]);

                        var coll2 = [],gainn2 = 0,countnode2 = 0;
                        ///////////////////
                        for(var i2 in node2Fetch) if(node2Fetch[i2] == node2Type[bb]) countnode2++;
                        $(" #variable").each(function(){

                            var classname2 =  "."+$(this).attr("class");
                            var typeheight2 = TypeOfValue(classname2);
                            var fetchHeight2 = fetchColumn(classname2);
                            var nodefetchcolumn2 = fetchColumn(" ."+node2);
                            var bb1 = 0,bb2 = 0;

                            for(var zz2 in typeheight2){
                                for(var xx2 in nodefetchcolumn2){
                                    if(nodefetchcolumn2[xx2]==rootnodeType[bb]){
                                        if(typeheight2[zz2]==fetchHeight2[xx2])bb1++;
                                    }
                                    if(resultColumn[xx2]=="none"&&nodefetchcolumn2[xx2]==node2Type[bb]){
                                        if(typeheight2[zz2]==fetchHeight2[xx2])bb2++;
                                    }
                                }
                                gainn1+=(bb1/countnode)*(info(bb2,bb1)+info(bb-bb2,bb1));
                                bb1=0;
                                bb2=0;
                            }
                            gainn2 = entop2 - gainn2;
                            coll2[$(this).attr("class")] = gainn2;
                            gainn2 = 0;
                        });

                        var node3 = highestValue(coll2);
                        tree.push("++++++>"+node3+"");

                        $("."+node3+":eq(0)").removeAttr('id');

                        /////

                        var node3Type = TypeOfValue("."+node3);
                        var node3Fetch = fetchColumn("."+node3);
//                        var node3Number = NumberOfType("."+node3);
                        var keynode3 = [],ccee3 = 0,god3= 0;


                        for(var ee3 in resultColumn){
                            if(node2Fetch[ee3] == node2Type[bb]){
                                keynode3.push(ee3);
                            }
                        }

                        for(var bb3 in node3Type){
                            for(var ww3 in keynode3){
                                if(node3Fetch[keynode3[ww3]] == node3Type[bb3]){
                                    god3++;
                                    if(resultColumn[keynode3[ww3]] == "none")ccee3++;
                                }
                            }
                            if(ccee3==god3) tree.push("++++++>"+node3Type[bb3]+"==>none");
                            else if(ccee3==0) tree.push("++++++>"+node3Type[bb3]+"==>sunburn");
                            else{

                                tree.push("++++++>"+node3Type[bb3]+"==NODE4....");

                            }
                            ccee3 = 0;
                            god3= 0;
                        }

/////////////////////////////////////////////////////////////////////////////////////////////
                    }

                    god=0;
                    ccee=0;
                }
            }
            count= 0;
        }

        //Display
        for(var ii in tree){
            $(" #result").append(tree[ii]+"<br>");
        }

    });
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