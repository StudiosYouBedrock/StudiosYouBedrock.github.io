let lang = ` `;
let nature = document.getElementById("nature");
let construction = document.getElementById("construction");
let equipment = document.getElementById("equipment");
let items = document.getElementById("items");
let none = document.getElementById("none");
onlypistonpush_checkbox.checked = true;
generate();
groups();

function generate() {
  // cretive
  let creative_category = "";
  let group = "";
  if (creative_checkbox.checked == true) {
    if (category.value == "nature") {
      group = nature.value;
    } else if (category.value == "construction") {
      group = construction.value;
    } else if (category.value == "equipment") {
      group = equipment.value;
    } else if (category.value == "items") {
      group = items.value;
    } else {
      group = none.value;
    }

    creative_category =
      `
"minecraft:creative_category": {
"group": "` +
      group +
      `",
"category": "` +
      category.value +
      `"
}`;
  } else {
    creative_category = "";
  }
  // geometry

  let geometry = ``;
  if (geometry_checkbox.checked == true) {
    geometry =
      `
"minecraft:geometry": "` +
      geometry_name.value +
      `",`;
  } else {
    geometry = ``;
  }
  // crafting_table

  let crafting_table = ``;
  if (crafting_table_checkbox.checked == true) {
    crafting_table =
      `	
"minecraft:crafting_table": {
"custom_description": "` +
      description.value +
      `",
"grid_size": 3, 
"crafting_tags": [` +
      crafting_tag.value +
      `]
}",`;
  } else {
    crafting_table = ``;
  }
  let entity_collision = "";
  if (entity_collision_checkbox.checked == true) {
    if (entity_collision_none_checkbox.checked == true) {
      entity_collision = `
"minecraft:entity_collision": false,`;
    } else {
      entity_collision =
        `
"minecraft:entity_collision": {
"origin": [` +
        entity_collision_or.value +
        `],
"size": [` +
        entity_collision_si.value +
        `]
},`;
    }
  } else {
    entity_collision = ``;
  }
  let pick_collision = "";
  if (pick_collision_checkbox.checked == true) {
    if (pick_collision_none_checkbox.checked == true) {
      pick_collision = `
"minecraft:pick_collision": false,`;
    } else {
      pick_collision =
        `
"minecraft:pick_collision": {
"origin": [` +
        pick_collision_or.value +
        `],
"size": [` +
        pick_collision_si.value +
        `]
},`;
    }
  } else {
    pick_collision = ``;
  }
  /*immovable*/
  if (inmovable_checkbox.checked == true) {
    immovable = `"minecraft:immovable": true,`;
  } else {
    immovable = `"minecraft:immovable": false,`;
  }
  /*breakonpush*/
  if (breakonpush_checkbox.checked == true) {
    breakonpush = `
"minecraft:breakonpush": true,`;
  } else {
    breakonpush = `
"minecraft:breakonpush": false,`;
  }
  /*onlypistonpush*/
  if (onlypistonpush_checkbox.checked == true) {
    onlypistonpush = `
"minecraft:onlypistonpush": true,`;
  } else {
    onlypistonpush = `
"minecraft:onlypistonpush": false,`;
  }
  // result
  document.getElementById("result_block_bh").value =
    `{
"format_version": "1.16.100",
"minecraft:block": {
"description": {
 "identifier": "` +
    identifier.value +
    `:` +
    name_block.value +
    `"
},
components": {` +
    creative_category +
    `
"minecraft:loot": "` +
    loot.value +
    `",
"minecraft:destroy_time": ` +
    time_destroy.value +
    `,
"minecraft:explosion_resistance": ` +
    resistencie_explosive.value +
    `,` +
    entity_collision +
    pick_collision +
    crafting_table +
    `
"minecraft:map_color": "` +
    map_color.value +
    `",
"minecraft:friction": ` +
    friction.value +
    `,` +
    geometry +
    `
` +
    immovable +
    breakonpush +
    onlypistonpush +
    `
"minecraft:block_light_absorption": ` +
    block_light_absorption.value +
    `,
"minecraft:block_light_emission":` +
    light_emisson.value +
    ` 
    }
  } 
}`;

  document.getElementById("result_block_b_rs").value =
    `{
"format_version": [1, 1, 0],
"` +
    identifier.value +
    `:` +
    name_block.value +
    `": {
      "textures": "` +
    name_block.value +
    `",
      "sound": "block"
  }
}`;

  document.getElementById("result_block_t_rs").value =
    `{
"resource_pack_name": "vanilla",
"texture_name": "atlas.terrain",
"padding": 8,
"num_mip_levels": 4,
"texture_data": {
"` +
    name_block.value +
    `": {
"textures": ["textures/blocks/` +
    name_block.value +
    `"]
       }
    }
}`;
}

function block_download() {
  let s1 = document.getElementById("result_block_bh");
  let s2 = document.getElementById("result_block_b_rs");
  let s3 = document.getElementById("result_block_t_rs");
  let name = name_block.value + ".json";
  var zip = new JSZip();

  var rs = zip.folder("rs");
  var bh = zip.folder("bh");
  var blocks = bh.folder("blocks");
  blocks.file(name, s1.value);

  var textures = rs.folder("textures");
  rs.file("blocks.json", s2.value);
  textures.file("terrain_texture.json", s3.value);
  //result
  zip.generateAsync({ type: "blob" }).then(function (content) {
    saveAs(content, name_block.value);
  });
}
function result_block_bh_copy() {
  let rs = document.getElementById("result_block_bh");
  var copyText = rs;
  copyText.select();
  copyText.setSelectionRange(0, 99999);
  navigator.clipboard.writeText(copyText.value);
}
function result_block_b_rs_copy() {
  let rs = document.getElementById("result_block_b_rs");
  var copyText = rs;
  copyText.select();
  copyText.setSelectionRange(0, 99999);
  navigator.clipboard.writeText(copyText.value);
}
function result_block_t_rs_copy() {
  let rs = document.getElementById("result_block_t_rs");
  var copyText = rs;
  copyText.select();
  copyText.setSelectionRange(0, 99999);
  navigator.clipboard.writeText(copyText.value);
}

function groups() {
  if (category.value == "nature") {
    nature.style.display = "block";
    construction.style.display = "none";
    none.style.display = "none";
    equipment.style.display = "none";
    items.style.display = "none";
  } else if (category.value == "construction") {
    nature.style.display = "none";
    construction.style.display = "block";
    none.style.display = "none";
    equipment.style.display = "none";
    items.style.display = "none";
  } else if (category.value == "equipment") {
    nature.style.display = "none";
    construction.style.display = "none";
    equipment.style.display = "block";
    none.style.display = "none";
    items.style.display = "none";
  } else if (category.value == "items") {
    nature.style.display = "none";
    construction.style.display = "none";
    equipment.style.display = "none";
    none.style.display = "none";
    items.style.display = "block";
  } else {
    nature.style.display = "none";
    construction.style.display = "none";
    equipment.style.display = "none";
    items.style.display = "none";
    none.style.display = "block";
  }
}
