document.getElementById("manifest").value = localStorage.getItem("dataM");
let manifestResultBh = document.getElementById("manifest_resultBh").value;
let manifestResultRs = document.getElementById("manifest_resultRs").value;

let namePack = "";
let namePackBh = "[BH]";
let namePackRs = "[RS]";

function save_manifest_data() {
  let manifest = document.getElementById("manifest").value;
  localStorage.setItem("dataM", manifest);
  console.log(localStorage.getItem("dataM"));
}

function generate_manifest() {
  const manifest = document.getElementById("manifest").value;
  //--------------------------------------
  //format_version
  //--------------------------------------
  let for_ver = manifest.includes("ForVer");
  if (for_ver == true) {
    for_ver = manifest.match(/ForVer\(([^)]+)\)/)[1];
  } else {
    for_ver = "2";
  }
  //--------------------------------------
  //description
  //--------------------------------------
  let description = manifest.includes("Description");
  if (description == true) {
    description = manifest.match(/Description\(([^)]+)\)/)[1];
  } else {
    description = "Creado con CubiScript";
  }
  //--------------------------------------
  //description
  //--------------------------------------
  let name = manifest.includes("Name");
  if (name == true) {
    name = manifest.match(/Name\(([^)]+)\)/)[1];
  } else {
    name = "Mi Addon";
  }
  //--------------------------------------
  //version
  //--------------------------------------
  let ver = manifest.includes("Version");
  if (ver == true) {
    ver = manifest.match(/Version\(([^)]+)\)/)[1];
  } else {
    ver = "0,0,1";
  }
  //--------------------------------------
  //--------------------------------------
  //version
  //--------------------------------------
  let minver = manifest.includes("MinVer");
  if (minver == true) {
    minver = manifest.match(/MinVer\(([^)]+)\)/)[1];
  } else {
    minver = "1.16.100";
  }
  //--------------------------------------
  let manifestFinal =
    `
    {
        "format_version":` +
    for_ver +
    `,
        "header": {
          "description": "` +
    description +
    `",
          "name": "` +
    name +
    `",
          "uuid": "` +
    uuidv4() +
    `",
          "version": [` +
    ver +
    `],
          "min_engine_version": [` +
    minver +
    `]
        },
        "modules": [
          {
            "type": "resources",
            "uuid": "` +
    uuidv4() +
    `",
            "version": [` +
    ver +
    `]
          }
        ]
      }
    `;

  console.log(manifestFinal);

  manifestResultRs = manifestFinal;
  manifestResultBh = manifestFinal;
  manifestResultBh = manifestResultBh.replace("resources", "data");
  console.log(manifestResultBh);
  console.log(manifestResultRs);
  namePack = name + "[" + ver + "]" + ".zip";
  namePackBh += name;
  namePackRs += name;
}
