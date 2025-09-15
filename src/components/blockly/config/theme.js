
import * as Blockly from 'blockly/core';
import { COLORS } from './color.js'

export default Blockly.Theme.defineTheme('modern', {
    base: Blockly.Themes.Classic,
    blockStyles: {
      list_blocks: {
        colourPrimary: COLORS.LISTS,
        colourSecondary: COLORS.LISTS,
        colourTertiary: COLORS.LISTS,
      },
      logic_blocks: {
        colourPrimary: COLORS.LOGIC,
        colourSecondary: COLORS.LOGIC,
        colourTertiary: COLORS.LOGIC
      },
      loop_blocks: {
        colourPrimary: COLORS.LOOPS,
        colourSecondary: COLORS.LOOPS,
        colourTertiary: COLORS.LOOPS,
      },
      math_blocks: {
        colourPrimary: COLORS.MATH,
        colourSecondary: COLORS.MATH,
        colourTertiary: COLORS.MATH,
      },
      procedure_blocks: {
        colourPrimary: COLORS.FUNCTIONS,
        colourSecondary: COLORS.FUNCTIONS,
        colourTertiary: COLORS.FUNCTIONS,
      },
      text_blocks: {
        colourPrimary: COLORS.TEXT,
        colourSecondary: COLORS.TEXT,
        colourTertiary: COLORS.TEXT,
      },
      variable_blocks: {
        colourPrimary: COLORS.VARIABLE,
        colourSecondary: COLORS.VARIABLE,
        colourTertiary: COLORS.VARIABLE,
      }
    },
    categoryStyles: {
      takeoff_category: {
        colour: COLORS.TAKEOFF
      },
      camera_category: {
        colour: COLORS.LAND
      },
      navigation_category: {
        colour: COLORS.NAVIGATION
      },
      land_category: {
        colour: COLORS.LAND
      },
      flip_category: {
        colour: COLORS.FLIP
      },
      logic_category:{
        colour: COLORS.LOGIC
      },
      loop_category: {
        colour: COLORS.LOOPS
      },
      math_category: {
        colour: COLORS.MATH
      },
      text_category: {
        colour: COLORS.TEXT
      },
      list_category: {
        colour: COLORS.LISTS
      },
      variable_category: {
        colour: COLORS.VARIABLE
      },
      functions_category: {
        colour: COLORS.FUNCTIONS
      },
    },
    componentStyles: {
        flyoutOpacity: 0.4
    },
    startHats: null,
  });