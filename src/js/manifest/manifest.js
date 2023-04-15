let lang = `[
  [ "en_US", "English (US)" ],
  [ "en_GB", "English (UK)" ],
  [ "de_DE", "Deutsch (Deutschland)" ],
  [ "es_ES", "Español (España)" ],
  [ "es_MX", "Español (México)" ],
  [ "fr_FR", "Français (France)" ],
  [ "fr_CA", "Français (Canada)" ],
  [ "it_IT", "Italiano (Italia)" ],
  [ "ja_JP", "日本語 (日本)" ],
  [ "ko_KR", "한국어 (대한민국)" ],
  [ "pt_BR", "Português (Brasil)" ],
  [ "pt_PT", "Português (Portugal)" ],
  [ "ru_RU", "Русский (Россия)" ],
  [ "zh_CN", "简体中文" ],
  [ "zh_TW", "繁體中文" ],
  [ "nl_NL", "Nederlands (Nederland)" ],
  [ "bg_BG", "Български (BG)" ],
  [ "cs_CZ", "Čeština (Česká republika)" ],
  [ "da_DK", "Dansk (DA)" ],
  [ "el_GR", "Ελληνικά (Ελλάδα)" ],
  [ "fi_FI", "Suomi (Suomi)" ],
  [ "hu_HU", "Magyar (HU)" ],
  [ "id_ID", "Bahasa Indonesia (Indonesia)" ],
  [ "nb_NO", "Norsk bokmål (Norge)" ],
  [ "pl_PL", "Polski (PL)" ],
  [ "sk_SK", "Slovensky (SK)" ],
  [ "sv_SE", "Svenska (Sverige)" ],
  [ "tr_TR", "Türkçe (Türkiye)" ],
  [ "uk_UA", "Українська (Україна)" ]
]`;
manifest_generate();

function manifest_generate() {
  let rs_m_r = document.getElementById("rs-m-r").style;
  let bh_m_r = document.getElementById("bh-m-r").style;
  let sk_m_r = document.getElementById("sk-m-r").style;
  let sk_none = document.getElementById("sk_none").style;

  if (manifest_type_pack.value == "rs") {
    manifest_rs();
    rs_m_r.display = "block";
    bh_m_r.display = "none";
    sk_m_r.display = "none";
    sk_none.display = "block";
  } else if (manifest_type_pack.value == "bh") {
    manifest_bh();
    rs_m_r.display = "none";
    bh_m_r.display = "block";
    sk_m_r.display = "none";
    sk_none.display = "block";
  } else if (manifest_type_pack.value == "rs_bh") {
    manifest_rs_bh();
    rs_m_r.display = "block";
    bh_m_r.display = "block";
    sk_m_r.display = "none";
    sk_none.display = "block";
  } else {
    manifest_sk();
    rs_m_r.display = "none";
    bh_m_r.display = "none";
    sk_m_r.display = "block";
    sk_none.display = "none";
  }
}

function manifest_rs() {
  let rs = document.getElementById("result_manifest_rs");

  const uuid_1 = uuidv4();
  const uuid_2 = uuidv4();
  let metadata = ``;
  if (autor_checkbox.checked == true) {
    metadata =
      `,
    "metadata": {
    "authors": [
      "` +
      autor_name.value +
      `"
    ],
    "url": "` +
      autor_url.value +
      `"
  }`;
  } else {
    metadata = "";
  }
  rs.value =
    `{
      "format_version": 2,
      "header": {
        "name": "` +
    name_pack_m.value +
    `",
        "description": "` +
    descripton_pack_m.value +
    `",
        "uuid": "` +
    uuid_1 +
    `",
        "version": [1, 0, 0],
        "min_engine_version": [` +
    min_ver_m.value +
    `]
      },
      "modules": [
        {
          "type": "resources",
          "uuid": "` +
    uuid_2 +
    `",
          "version": [1, 0, 0]
        }
      ]` +
    metadata +
    `
    }
    `;
}

function manifest_bh() {
  manifest_rs();
  let rs = document.getElementById("result_manifest_rs");
  let bh = document.getElementById("result_manifest_bh");

  bh.value = rs.value;
  bh.value = bh.value.replace("resources", "data");
}

function manifest_rs_bh() {
  let rs = document.getElementById("result_manifest_rs");
  let bh = document.getElementById("result_manifest_bh");

  let metadata = ``;
  if (autor_checkbox.checked == true) {
    metadata =
      `,
    "metadata": {
    "authors": [
      "` +
      autor_name.value +
      `"
    ],
    "url": "` +
      autor_url.value +
      `"
  }`;
  } else {
    metadata = "";
    console.log("");
  }

  const uuid_1 = uuidv4();
  const uuid_2 = uuidv4();
  const uuid_3 = uuidv4();
  const uuid_4 = uuidv4();
  rs.value =
    `{
      "format_version": 2,
      "header": {
        "name": "` +
    name_pack_m.value +
    `",
        "description": "` +
    descripton_pack_m.value +
    `",
        "uuid": "` +
    uuid_1 +
    `",
        "version": [1, 0, 0],
        "min_engine_version": [` +
    min_ver_m.value +
    `]
      },
      "modules": [
        {
          "type": "resources",
          "uuid": "` +
    uuid_2 +
    `",
          "version": [1, 0, 0]
        }
      ]` +
    metadata +
    `,
    "dependencies": [
        {
            "uuid": "` +
    uuid_3 +
    `",
            "version": [1, 0, 0]
        }
   ]
    }
    `;
  // _______________________________
  //bh
  // _______________________________
  bh.value =
    `{
      "format_version": 2,
      "header": {
        "name": "` +
    name_pack_m.value +
    `",
        "description": "` +
    descripton_pack_m.value +
    `",
        "uuid": "` +
    uuid_3 +
    `",
        "version": [1, 0, 0],
        "min_engine_version": [` +
    min_ver_m.value +
    `]
      },
      "modules": [
        {
          "type": "data",
          "uuid": "` +
    uuid_4 +
    `",
          "version": [1, 0, 0]
        }
      ]` +
    metadata +
    `,
    "dependencies": [
        {
            "uuid": "` +
    uuid_1 +
    `",
            "version": [1, 0, 0]
        }
   ]
    }
    `;
}

function manifest_sk() {
  let sk = document.getElementById("result_manifest_sk");

  const uuid_1 = uuidv4();
  const uuid_2 = uuidv4();
  let metadata = ``;
  if (autor_checkbox.checked == true) {
    metadata =
      `,
    "metadata": {
    "authors": [
      "` +
      autor_name.value +
      `"
    ],
    "url": "` +
      autor_url.value +
      `"
  }`;
  } else {
    metadata = "";
  }
  sk.value =
    `{
      "format_version": 2,
      "header": {
        "name": "` +
    name_pack_m.value +
    `",
        "uuid": "` +
    uuid_1 +
    `",
        "version": [1, 0, 0]
      },
      "modules": [
        {
          "type": "skin_pack",
          "uuid": "` +
    uuid_2 +
    `",
          "version": [1, 0, 0]
        }
      ]` +
    metadata +
    `
    }
    `;
}

function manifest_download() {
  if (manifest_type_pack.value == "rs") {
    manifest_generate();
    manifest_rs_download();
  } else if (manifest_type_pack.value == "bh") {
    manifest_generate();
    manifest_bh_download();
  } else if (manifest_type_pack.value == "rs_bh") {
    manifest_generate();
    manifest_rs_bh_download();
  } else {
    manifest_generate();
    manifest_sk_download();
  }
}

function manifest_rs_download() {
  let rs = document.getElementById("result_manifest_rs");
  let namePack = name_pack_m.value + "[Rs].zip";
  //   generate_manifest();
  var zip = new JSZip();

  zip.file("manifest.json", rs.value);

  //result
  zip.generateAsync({ type: "blob" }).then(function (content) {
    saveAs(content, namePack);
  });
}

function manifest_bh_download() {
  let bh = document.getElementById("result_manifest_bh");
  let namePack = name_pack_m.value + "[Bh].zip";
  //   generate_manifest();
  var zip = new JSZip();

  zip.file("manifest.json", bh.value);

  //result
  zip.generateAsync({ type: "blob" }).then(function (content) {
    saveAs(content, namePack);
  });
}

function manifest_rs_bh_download() {
  let rs = document.getElementById("result_manifest_rs");
  let bh = document.getElementById("result_manifest_bh");
  let namePack = name_pack_m.value + ".zip";
  let namePackRs = name_pack_m.value + "[Rs]";
  let namePackBh = name_pack_m.value + "[Bh]";
  //   generate_manifest();
  var zip = new JSZip();

  var resources = zip.folder(namePackRs);
  resources.file("manifest.json", rs.value);
  var data = zip.folder(namePackBh);
  data.file("manifest.json", bh.value);
  //result
  zip.generateAsync({ type: "blob" }).then(function (content) {
    saveAs(content, namePack);
  });
}

function manifest_sk_download() {
  let sk = document.getElementById("result_manifest_sk");
  let namePack = name_pack_m.value + "[Sk].zip";
  //   generate_manifest();
  var zip = new JSZip();

  zip.file("manifest.json", sk.value);

  //result
  zip.generateAsync({ type: "blob" }).then(function (content) {
    saveAs(content, namePack);
  });
}

function manifest_copy_rs() {
  let rs = document.getElementById("result_manifest_rs");
  var copyText = rs;
  copyText.select();
  copyText.setSelectionRange(0, 99999);
  navigator.clipboard.writeText(copyText.value);
}

function manifest_copy_bh() {
  let bh = document.getElementById("result_manifest_bh");
  var copyText = bh;
  copyText.select();
  copyText.setSelectionRange(0, 99999);
  navigator.clipboard.writeText(copyText.value);
}

function manifest_copy_sk() {
  let sk = document.getElementById("result_manifest_sk");
  var copyText = sk;
  copyText.select();
  copyText.setSelectionRange(0, 99999);
  navigator.clipboard.writeText(copyText.value);
}

function zip() {
  //   generate_manifest();
  var zip = new JSZip();
  //bh
  var bh = zip.folder("namePackBh");
  bh.file("manifest.json", "manifestResultBh");
  var blocks = bh.folder("blocks");
  blocks.file("name_block", "blockdata");
  bh.folder("items");
  bh.folder("structures");
  //resource
  var rs = zip.folder("namePackRs");

  rs.file("manifest.json", "manifestResultRs");
  var tex = rs.folder("textures");
  tex.folder("blocks");
  tex.folder("items");
  tex.folder("ui");
  tex.folder("models");
  //result
  zip.generateAsync({ type: "blob" }).then(function (content) {
    saveAs(content, "namePack");
  });
}
