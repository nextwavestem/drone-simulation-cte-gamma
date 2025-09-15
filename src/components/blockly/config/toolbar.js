import { toolbarFunctionHandler } from './toolbarFunctionHandler.js'
import { COLORS } from './color.js'


toolbarFunctionHandler();

export const toolbarConfig = {
  kind: "categoryToolbox",
  contents: [
    {
      kind: "category",
      name: "Takeoff",
      categorystyle: 'takeoff_category',
      contents: [
        {
          kind: "block",
          type: "takeoff"
        },
        {
          kind: "block",
          type: "takeoff_after_seconds"
        }
      ]
    },
    {
      kind: "category",
      name: "Camera",
      categorystyle: 'camera_category',
      contents: [
        {
          kind: "block",
          type: "capture_image"
        },
      ]
    },
    {
      kind: "category",
      name: "Navigation",
      categorystyle: 'navigation_category',
      contents: [
        {
          kind: "block",
          type: "set_speed"
        },
        {
          kind: "block",
          type: "wait"
        },
        {
          kind: "block",
          type: "flying_forward_distance"
        },
        {
          kind: "block",
          type: "flying_backward_distance"
        },
        {
          kind: "block",
          type: "flying_left_distance"
        },
        {
          kind: "block",
          type: "flying_right_distance"
        },
        {
          kind: "block",
          type: "flying_up_distance"
        },
        {
          kind: "block",
          type: "flying_down_distance"
        },
        {
          kind: "block",
          type: "fly"
        },
        {
          kind: "block",
          type: "arc_left"
        },
        {
          kind: "block",
          type: "arc_right"
        },
        {
          kind: "block",
          type: "yaw_left"
        },
        {
          kind: "block",
          type: "yaw_right"
        }
      ]
    },
    {
      kind: "category",
      name: "Flip",
      categorystyle: 'flip_category',
      contents: [
        {
          kind: "block",
          type: "flip_forward"
        },
        {
          kind: "block",
          type: "flip_backward"
        },
        {
          kind: "block",
          type: "flip_left"
        },
        {
          kind: "block",
          type: "flip_right"
        }
      ]
    },
    {
      kind: "category",
      name: "Land",
      categorystyle: 'land_category',
      contents: [
        {
          kind: "block",
          type: "land"
        },
        {
          kind: "block",
          type: "land_for_seconds"
        }
      ]
    },
    {
      kind: "sep"
    },
    {
      kind: "category",
      name: "Logic",
      categorystyle: 'logic_category',
      contents: [
        {
          kind: "block",
          type: "controls_if"
        },
        {
          kind: "block",
          type: "logic_compare",
          fields: {
            OP: "EQ"
          }
        },
        {
          kind: "block",
          type: "logic_operation",
          fields: {
            OP: "AND"
          }
        },
        {
          kind: "block",
          type: "logic_negate"
        },
        {
          kind: "block",
          type: "logic_boolean",
          fields: {
            BOOL: "TRUE"
          }
        }
      ]
    },
    {
      kind: "category",
      name: "Loops",
      categorystyle: "loop_category",
      contents: [
        {
          kind: "block",
          type: "controls_repeat_ext",
          inputs: {
            TIMES: {
              shadow: {
                kind: "block",
                type: "math_number",
                fields: {
                  NUM: 10
                }
              }
            }
          }
        },
        {
          kind: "block",
          type: "controls_whileUntil",
          fields: {
            MODE: "WHILE"
          }
        }
      ]
    },
    {
      kind: "category",
      name: "Math",
      categorystyle: "math_category",
      contents: [
        {
          kind: "block",
          type: "math_number",
          fields: {
            NUM: 123
          }
        },
        {
          kind: "block",
          type: "math_arithmetic",
          fields: {
            OP: "ADD"
          },
          inputs: {
            A: {
              shadow: {
                kind: "block",
                type: "math_number",
                fields: {
                  NUM: 1
                }
              }
            },
            B: {
              shadow: {
                kind: "block",
                type: "math_number",
                fields: {
                  NUM: 1
                }
              }
            }
          }
        },
        {
          kind: "block",
          type: "math_single",
          fields: {
            OP: "ROOT"
          },
          inputs: {
            NUM: {
              shadow: {
                kind: "block",
                type: "math_number",
                fields: {
                  NUM: 9
                }
              }
            }
          }
        },
        {
          kind: "block",
          type: "math_trig",
          fields: {
            OP: "SIN"
          },
          inputs: {
            NUM: {
              shadow: {
                kind: "block",
                type: "math_number",
                fields: {
                  NUM: 45
                }
              }
            }
          }
        },
        {
          kind: "block",
          type: "math_constant",
          fields: {
            CONSTANT: "PI"
          }
        },
        {
          kind: "block",
          type: "math_number_property",
          fields: {
            PROPERTY: "EVEN"
          },
          inputs: {
            NUMBER_TO_CHECK: {
              shadow: {
                kind: "block",
                type: "math_number",
                fields: {
                  NUM: 0
                }
              }
            }
          }
        },
        {
          kind: "block",
          type: "math_round",
          fields: {
            OP: "ROUND"
          },
          inputs: {
            NUM: {
              shadow: {
                kind: "block",
                type: "math_number",
                fields: {
                  NUM: 3.1
                }
              }
            }
          }
        },
        {
          kind: "block",
          type: "math_on_list",
          fields: {
            OP: "SUM"
          }
        },
        {
          kind: "block",
          type: "math_modulo",
          inputs: {
            DIVIDEND: {
              shadow: {
                kind: "block",
                type: "math_number",
                fields: {
                  NUM: 64
                }
              }
            },
            DIVISOR: {
              shadow: {
                kind: "block",
                type: "math_number",
                fields: {
                  NUM: 10
                }
              }
            }
          }
        },
        {
          kind: "block",
          type: "math_constrain",
          inputs: {
            VALUE: {
              shadow: {
                kind: "block",
                type: "math_number",
                fields: {
                  NUM: 50
                }
              }
            },
            LOW: {
              shadow: {
                kind: "block",
                type: "math_number",
                fields: {
                  NUM: 1
                }
              }
            },
            HIGH: {
              shadow: {
                kind: "block",
                type: "math_number",
                fields: {
                  NUM: 100
                }
              }
            }
          }
        },
        {
          kind: "block",
          type: "math_random_int",
          inputs: {
            FROM: {
              shadow: {
                kind: "block",
                type: "math_number",
                fields: {
                  NUM: 1
                }
              }
            },
            TO: {
              shadow: {
                kind: "block",
                type: "math_number",
                fields: {
                  NUM: 100
                }
              }
            }
          }
        },
        {
          kind: "block",
          type: "math_random_float"
        }
      ]
    },
    {
      kind: "category",
      name: "Text",
      categorystyle: "text_category",
      contents: [
        {
          kind: "block",
          type: "text",
          fields: {
            TEXT: ""
          }
        },
        {
          kind: "block",
          type: "text_length"
        },
        {
          kind: "block",
          type: "text_print"
        }
      ]
    },
    {
      kind: "category",
      name: "Lists",
      categorystyle: "list_category",
      contents: [
        {
          kind: "block",
          type: "lists_create_with"
        },
        {
          kind: "block",
          type: "lists_create_with"
        },
        {
          kind: "block",
          type: "lists_repeat",
          inputs: {
            NUM: {
              shadow: {
                kind: "block",
                type: "math_number",
                fields: {
                  NUM: 5
                }
              }
            }
          }
        },
        {
          kind: "block",
          type: "lists_length"
        },
        {
          kind: "block",
          type: "lists_isEmpty"
        },
        {
          kind: "block",
          type: "lists_indexOf",
          fields: {
            END: "FIRST"
          },
          inputs: {
            VALUE: {
              block: {
                kind: "block",
                type: "variables_get",
                fields: {
                  VAR: {
                    name: "list"
                  },
                },
              },
            },
          },
        },
        {
          type: 'lists_split',
          kind: 'block',
          fields: {
            MODE: 'SPLIT',
          },
          inputs: {
            DELIM: {
              shadow: {
                type: 'text',
                fields: {
                  TEXT: ',',
                },
              },
            },
          },
        },
        {
          type: 'lists_sort',
          kind: 'block',
          fields: {
            TYPE: 'NUMERIC',
            DIRECTION: '1',
          },
        }
      ],
    },
    {
      kind: 'sep',
    },
    {
      kind: 'category',
      name: 'Variables',
      custom: 'VARIABLE',
      categorystyle: 'variable_category',
    },
    {
      kind: 'category',
      name: 'Functions',
      custom: 'PROCEDURE',
      categorystyle: 'functions_category',
    },
  ]
};

export const toolbarBlocksDefinitions = (Blockly) => {

  // TAKEOFF
  Blockly.Blocks['takeoff'] = {
    init: function() {
      this.appendDummyInput()
          .appendField("Take off");
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(COLORS.TAKEOFF);
      this.setTooltip("Command to take off");
      this.setHelpUrl("");
    }
  };

  Blockly.Blocks['takeoff_after_seconds'] = {
    init: function() {
      this.appendDummyInput()
          .appendField("take off after")
          .appendField(new Blockly.FieldNumber(0, 0, 60), "SECONDS")
          .appendField("seconds");
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(COLORS.TAKEOFF);
      this.setTooltip("Command to take off after a specific number of seconds");
      this.setHelpUrl("");
    }
  };

  Blockly.Blocks['capture_image'] = {
    init: function() {
      this.appendDummyInput()
          .appendField("capture");
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(COLORS.TAKEOFF);
      this.setTooltip("Command to take image");
      this.setHelpUrl("");
    }
  };

  // NAVIGATION
  Blockly.Blocks['set_speed'] = {
    init: function() {
      this.appendDummyInput()
          .appendField("set speed")
          .appendField(new Blockly.FieldDropdown([["25", '1'],["50", '2'],["75", '3'],["100", '4']]), 'SPEED')
          .appendField("cm/s");
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(COLORS.NAVIGATION);
      this.setTooltip("Command to set drone speed");
      this.setHelpUrl("");
    }
  };

  Blockly.Blocks['wait'] = {
    init: function() {
      this.appendDummyInput()
          .appendField("wait")
          .appendField(new Blockly.FieldNumber(0, 0, 60), "SECONDS")
          .appendField("seconds");
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(COLORS.NAVIGATION);
      this.setTooltip("Command to set wait time for drone");
      this.setHelpUrl("");
    }
  };

  Blockly.Blocks['flying_forward_distance'] = {
    init: function() {
      this.appendValueInput("DISTANCE") // Accepts variable or number blocks
          .setCheck("Number") // Ensures only number-type blocks can connect
          .appendField("fly forward");

      this.appendDummyInput()
          .appendField(new Blockly.FieldDropdown([["inches", "INCHES"], ["cm", "CM"]]), "UNIT");

      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(COLORS.NAVIGATION);
      this.setTooltip("Command to fly forward a certain distance in inches or cm");
      this.setHelpUrl("");
    }
  };
  

  Blockly.Blocks['flying_forward_time'] = {
    init: function() {
      this.appendDummyInput()
          .appendField("fly forward")
          .appendField(new Blockly.FieldNumber(0, 0, 60), "SECONDS")
          .appendField("seconds");
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(COLORS.NAVIGATION);
      this.setTooltip("Command to set wait time for drone");
      this.setHelpUrl("");
    }
  };


  Blockly.Blocks['flying_backward_distance'] = {
    init: function() {
      this.appendDummyInput() // Use DummyInput for both fields
        .appendField("fly backward")
        .appendField(new Blockly.FieldNumber(0, 0, null), "DISTANCE") // Add FieldNumber
        .appendField(new Blockly.FieldDropdown([["inches", "INCHES"], ["cm", "CM"]]), "UNIT"); // Add Dropdown on the same line
      this.setPreviousStatement(true, null); // Allow chaining with previous block
      this.setNextStatement(true, null); // Allow chaining with next block
      this.setColour(COLORS.NAVIGATION);
      this.setTooltip("Command to fly backward a certain distance in inches or cm");
      this.setHelpUrl("");
    }
  };

  Blockly.Blocks['flying_backward_time'] = {
    init: function() {
      this.appendDummyInput()
          .appendField("fly backward")
          .appendField(new Blockly.FieldNumber(0, 0, 60), "SECONDS")
          .appendField("seconds");
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(COLORS.NAVIGATION);
      this.setTooltip("Command to set wait time for drone");
      this.setHelpUrl("");
    }
  };

  Blockly.Blocks['flying_left_distance'] = {
    init: function() {
      this.appendDummyInput() // Use DummyInput for grouping
          .appendField("fly left")
          .appendField(new Blockly.FieldNumber(0, 0, null), "DISTANCE") // Add FieldNumber for distance
          .appendField(new Blockly.FieldDropdown([["inches", "INCHES"], ["cm", "CM"]]), "UNIT"); // Add Dropdown for units
      
      this.setPreviousStatement(true, null); // Allow chaining with previous block
      this.setNextStatement(true, null); // Allow chaining with next block
      this.setColour(COLORS.NAVIGATION); // Set block color
      this.setTooltip("Command to fly left a certain distance in inches or cm");
      this.setHelpUrl("");
    }
  };
  

  Blockly.Blocks['flying_left_time'] = {
    init: function() {
      this.appendDummyInput()
          .appendField("fly left")
          .appendField(new Blockly.FieldNumber(0, 0, 60), "SECONDS")
          .appendField("seconds");
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(COLORS.NAVIGATION);
      this.setTooltip("Command to set wait time for drone");
      this.setHelpUrl("");
    }
  };

  Blockly.Blocks['flying_right_distance'] = {
    init: function() {
      this.appendDummyInput() // Group everything on the same line
          .appendField("fly right")
          .appendField(new Blockly.FieldNumber(0, 0, null), "DISTANCE") // Add numeric input for distance
          .appendField(new Blockly.FieldDropdown([["inches", "INCHES"], ["cm", "CM"]]), "UNIT"); // Add dropdown for units
  
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(COLORS.NAVIGATION);
      this.setTooltip("Command to fly right a certain distance in inches or cm");
      this.setHelpUrl("");
    }
  };
  

  Blockly.Blocks['flying_right_time'] = {
    init: function() {
      this.appendDummyInput()
          .appendField("fly right")
          .appendField(new Blockly.FieldNumber(0, 0, 60), "SECONDS")
          .appendField("seconds");
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(COLORS.NAVIGATION);
      this.setTooltip("Command to set wait time for drone");
      this.setHelpUrl("");
    }
  };

  Blockly.Blocks['flying_up_distance'] = {
    init: function() {
      this.appendDummyInput() // Group everything on the same line
          .appendField("fly up")
          .appendField(new Blockly.FieldNumber(0, 0, null), "DISTANCE") // Add numeric input for distance
          .appendField(new Blockly.FieldDropdown([["inches", "INCHES"], ["cm", "CM"]]), "UNIT"); // Add dropdown for units
  
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(COLORS.NAVIGATION);
      this.setTooltip("Command to fly up a certain distance in inches or cm");
      this.setHelpUrl("");
    }
  };
  

  Blockly.Blocks['flying_up_time'] = {
    init: function() {
      this.appendDummyInput()
          .appendField("fly up")
          .appendField(new Blockly.FieldNumber(0, 0, 60), "SECONDS")
          .appendField("seconds");
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(COLORS.NAVIGATION);
      this.setTooltip("Command to set wait time for drone");
      this.setHelpUrl("");
    }
  };

  Blockly.Blocks['flying_down_distance'] = {
    init: function() {
      this.appendDummyInput() // Group everything on the same line
          .appendField("fly down")
          .appendField(new Blockly.FieldNumber(0, 0, null), "DISTANCE") // Add numeric input for distance
          .appendField(new Blockly.FieldDropdown([["inches", "INCHES"], ["cm", "CM"]]), "UNIT"); // Add dropdown for units
  
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(COLORS.NAVIGATION);
      this.setTooltip("Command to fly down a certain distance in inches or cm");
      this.setHelpUrl("");
    }
  };
  

  Blockly.Blocks['flying_down_time'] = {
    init: function() {
      this.appendDummyInput()
          .appendField("fly down")
          .appendField(new Blockly.FieldNumber(0, 0, 60), "SECONDS")
          .appendField("seconds");
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(COLORS.NAVIGATION);
      this.setTooltip("Command to set wait time for drone");
      this.setHelpUrl("");
    }
  };

  Blockly.Blocks['fly'] = {
    init: function() {
      this.appendDummyInput()
          .appendField("fly x")
          .appendField(new Blockly.FieldNumber(0, -Infinity, null), "x")
          .appendField("y")
          .appendField(new Blockly.FieldNumber(0, -Infinity, null), "y")
          .appendField("z")
          .appendField(new Blockly.FieldNumber(0, -Infinity, null), "z")
          .appendField(new Blockly.FieldDropdown([["inches", "INCHES"], ["cm", "CM"]]), "UNIT"); // Add dropdown for units
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(COLORS.NAVIGATION);
      this.setTooltip("Command to set wait time for drone");
      this.setHelpUrl("");
    }
  };

  Blockly.Blocks['arc_left'] = {
    init: function() {
      this.appendDummyInput() // Group everything on the same line
          .appendField("arc left")
          .appendField(new Blockly.FieldNumber(0, 0, null), "DEGREE") // Degrees input
          .appendField(" degrees with ") 
          .appendField(new Blockly.FieldNumber(0, 0, null), "DISTANCE") // Distance input
          .appendField(new Blockly.FieldDropdown([["inches", "INCHES"], ["cm", "CM"]]), "UNIT") // Unit dropdown
          .appendField(" radius");
  
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(COLORS.NAVIGATION);
      this.setTooltip("Command to arc left a certain number of degrees and distance with radius in inches or cm");
      this.setHelpUrl("");
    }
  };

  Blockly.Blocks['arc_right'] = {
    init: function() {
      this.appendDummyInput() // Group everything on the same line
          .appendField("arc right")
          .appendField(new Blockly.FieldNumber(0, 0, null), "DEGREE") // Degrees input
          .appendField(" degrees with ") 
          .appendField(new Blockly.FieldNumber(0, 0, null), "DISTANCE") // Distance input
          .appendField(new Blockly.FieldDropdown([["inches", "INCHES"], ["cm", "CM"]]), "UNIT") // Unit dropdown
          .appendField(" radius");
  
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(COLORS.NAVIGATION);
      this.setTooltip("Command to arc right a certain number of degrees and distance with radius in inches or cm");
      this.setHelpUrl("");
    }
  };
  

  Blockly.Blocks['circle_left'] = {
    init: function() {
      this.appendDummyInput() // Group everything on the same line
          .appendField("circle left with ")
          .appendField(new Blockly.FieldNumber(0, 0, null), "DISTANCE") // Distance input
          .appendField(new Blockly.FieldDropdown([["inches", "INCHES"], ["cm", "CM"]]), "UNIT") // Unit dropdown
          .appendField(" radius");
  
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(COLORS.NAVIGATION);
      this.setTooltip("Command to fly in a circle to the left with a given radius in inches or cm");
      this.setHelpUrl("");
    }
  };
  

  Blockly.Blocks['circle_right'] = {
    init: function() {
      this.appendDummyInput() // Group everything on the same line
          .appendField("circle right with ")
          .appendField(new Blockly.FieldNumber(0, 0, null), "DISTANCE") // Distance input
          .appendField(new Blockly.FieldDropdown([["inches", "INCHES"], ["cm", "CM"]]), "UNIT") // Unit dropdown
          .appendField(" radius");
  
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(COLORS.NAVIGATION);
      this.setTooltip("Command to fly in a circle to the right with a given radius in inches or cm");
      this.setHelpUrl("");
    }
  };
  

  Blockly.Blocks['yaw_left'] = {
    init: function() {
      this.appendDummyInput() // Group everything on the same line
          .appendField("yaw left")
          .appendField(new Blockly.FieldNumber(0, 0, null), "DEGREE") // Degrees input
          .appendField(" degrees");
      
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(COLORS.NAVIGATION);
      this.setTooltip("Command to yaw left by a certain number of degrees");
      this.setHelpUrl("");
    }
  };

  Blockly.Blocks['yaw_right'] = {
    init: function() {
      this.appendDummyInput() // Group everything on the same line
          .appendField("yaw right")
          .appendField(new Blockly.FieldNumber(0, 0, null), "DEGREE") // Degrees input
          .appendField(" degrees");
      
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(COLORS.NAVIGATION);
      this.setTooltip("Command to yaw right by a certain number of degrees");
      this.setHelpUrl("");
    }
  };

  Blockly.Blocks['flip_left'] = {
    init: function() {
      this.appendDummyInput().appendField("flip left");
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(COLORS.FLIP);
      this.setTooltip("Command to flip left");
      this.setHelpUrl("");
    }
  };

  Blockly.Blocks['flip_right'] = {
    init: function() {
      this.appendDummyInput().appendField("flip right");
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(COLORS.FLIP);
      this.setTooltip("Command to flip right");
      this.setHelpUrl("");
    }
  };

  Blockly.Blocks['flip_forward'] = {
    init: function() {
      this.appendDummyInput().appendField("flip forward");
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(COLORS.FLIP);
      this.setTooltip("Command to flip forward");
      this.setHelpUrl("");
    }
  };
  
  Blockly.Blocks['flip_backward'] = {
    init: function() {
      this.appendDummyInput().appendField("flip backward");
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(COLORS.FLIP);
      this.setTooltip("Command to flip backward");
      this.setHelpUrl("");
    }
  };

  Blockly.Blocks['land'] = {
    init: function() {
      this.appendDummyInput()
          .appendField("land");
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(COLORS.LAND);
      this.setTooltip("Command to land");
      this.setHelpUrl("");
    }
  };


  Blockly.Blocks['land_for_seconds'] = {
    init: function() {
      this.appendDummyInput()
          .appendField("land for ")
          .appendField(new Blockly.FieldNumber(0, 0, 60), "SECONDS")
          .appendField("seconds then takeoff");
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(COLORS.LAND);
      this.setTooltip("Command to take off after a specific number of seconds");
      this.setHelpUrl("");
    }
  };
};
