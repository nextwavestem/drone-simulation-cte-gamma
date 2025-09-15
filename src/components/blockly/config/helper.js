export const isIfStatement = (code) => {return /if\s*\(.*\)/.test(code)};
export const isForLoop = (code) => {return   /for\s*\(.*\)/.test(code)};

export const getForLoopContent = (forLoopString) => {
    const regex = /for\s*\(\s*var\s+(\w+)\s*=\s*(\d+);\s*\1\s*<\s*(\d+);\s*\1\+\+\s*\)/;
    const match = forLoopString.match(regex);
  
    if (!match) {
      throw new Error("Invalid for loop format");
    }

    const endValue = parseInt(match[3], 10);   

    const contentMatch = forLoopString.match(/\{([^}]*)\}/);
    let loopContent = '';
    if (contentMatch) {
        loopContent = contentMatch[1].trim();
        console.log("Contents inside the loop: ", loopContent);
      } else {
        console.log("No content found inside braces.");
      }

    return {
        count: endValue,
        content: loopContent
    };
}

  