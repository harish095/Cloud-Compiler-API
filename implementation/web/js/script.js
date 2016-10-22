$(document).ready(function(){
    var editor = ace.edit("code");
    var editorInput = ace.edit("input");
    var editorOutput = ace.edit("output");
    editor.setTheme("ace/theme/cobalt");
    editorInput.setTheme("ace/theme/chaos");
    editorOutput.setTheme("ace/theme/vibrant_ink");
    editor.session.setMode("ace/mode/c_cpp");
    editorInput.session.setMode("ace/mode/plain_text");
    editorOutput.session.setMode("ace/mode/plain_text");
    editor.setShowPrintMargin(false);
    editorInput.setShowPrintMargin(false);
    editorOutput.setShowPrintMargin(false);
    editor.on("input", function(){
        $("#characters").html("Number of characters: " + editor.session.getValue().length);
    });
    var language = 13;
    $("#submit").click(function(){
        var code = editor.getValue();
        var input = editorInput.getValue();
        $.ajax({
            url: 'php/index.php',
            type: 'GET',
            data: {
              "sourceCode": code,
              "langId": language,
              "stdin": input
            },
            dataType: "json",
            success: function (response){
                switch (response["status"]){
                    case "0":
                        $("#status").html("Status: <b>Done</b>");
                        break;
                    case "1":
                        $("#status").html("Status: <b>Compilation</b>");
                        break;
                    case "3":
                        $("#status").html("Status: <b>Running</b>");
                        break;
                }
                switch (response["result"]){
                    case "11":
                        $("#result").html("Result: <b>Compilation error</b>");
                        break;
                    case "12":
                        $("#result").html("Result: <b>Runtime error</b>");
                        break;
                    case "13":
                        $("#result").html("Result: <b>Time limit exceeded</b>");
                        break;
                    case "15":
                        $("#result").html("Result: <b>Succes</b>");
                        break;
                    case "17":
                        $("#result").html("Result: <b>Memory limit exceeded</b>");
                        break;
                    case "19":
                        $("#result").html("Result: <b>Illegal system call</b>");
                        break;
                    case "20":
                        $("#result").html("Result: <b>Internal error</b>");
                        break;
                }
                if (response["any_cmperr"]==true){
                    editorOutput.setValue(response["cmperr"], 1);
                    $("#time").html("Execution time: <b> - seconds</b>");
                    $("#memory").html("Memory: <b> - kilobytes</b>");
                }
                else{
                    editorOutput.setValue(response["stdout"], 1);
                    $("#time").html("Execution time: <b>" + response["time"] + " seconds</b>");
                    $("#memory").html("Memory: <b>" + response["memory"] + " bytes</b>");
                }
            }
        });
    });
})
