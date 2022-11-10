 //se puede dar distintas funciones como godot
 //es igual a un string de godot si escribimos + podemos juntar dos variables o funciones
 //las variables no se escrive ente comillas ""
 // se púede llamar a una variable y cambiar su data info
 //alert(Name)
 //comprobacion
 //let regExp = /(^\s*["`]version["`]:\s*["`])(.+)(["`][,]*\n*)/im;

 //let verifiqueOk = regExp.test(verifique)
 //descargar

 //------------------------------------------------------------------------

 function uuidv4() {
     return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
         (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
     );
 }

 function dat() {
     if (namePck.value == 0) {
         alert("Tienes que poner nombre para generar un Manifest")
     } else {
         document.getElementById("Texto").value = (`{
        "format_version": 2,
        "header": {
            "description": "` + (despriptionPck.value) + `",
            "name": "` + (namePck.value) + `",
            "uuid": "` + (uuidv4()) + `",
            "version": [1,0,0],
            "min_engine_version": [` + (minv.value) + `]` + `
                 ` +
             `},
            "modules": [{
            "description": "` + (despriptionPck.value) + `",
            "type": "` + (typePck.value) + `",
            "uuid": "` + (uuidv4()) + `",
            "version": [1,0,0]
        }]
    }`)
     }
 };
 //` + (v1.value) + `, ` + (v2.value) + `, ` + (v3.value) + `
 function exportar(data, fileName) {
     const a = document.createElement("a");
     const contenido = data,
         blob = new Blob([contenido], { type: "octet/stream" }),
         url = window.URL.createObjectURL(blob);
     a.href = url;
     a.download = fileName;
     a.click();
     window.URL.revokeObjectURL(url);

 };

 document.querySelector('#exportar').onclick = function() {
     if (namePck.value == 0) {
         alert("Tienes que poner nombre para exportar.");
     } else {
         dat()
         const data = document.querySelector('#Texto').value;
         const nombreArchivo = 'manifest.json'
         exportar(data, nombreArchivo);
     }
 }

 function valideKey(evt) {


     var code = (evt.which) ? evt.which : evt.keyCode;

     if (code == 8) {
         return true;
     } else if (code >= 48 && code <= 57) {
         return true;
     } else {
         return false;
     }
 }