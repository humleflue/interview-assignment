/* Purpurse: Pads a string to a certain length.
 * Input:    @strIn The string which the function applies padding to.
 *           @newStrLen can be both positive and negative:
 *           - If the length is positive, the string gets adjusted to the left
 *           - If the length is negative, the string gets adjusted to the right
 *           @padChar is the character, which fills of the padding space.
 * Output:   Returns the padded string.
 */
function pad(strIn, newStrLen, padChar) {
  const str = `${strIn}`; // All input gets converted to string.
  let newStr = ``;
  const paddingLength = Math.abs(newStrLen) - str.length;
  // Error checking
  if (paddingLength <= 0 || newStrLen === 0) {
    newStr = str;
  }
  // This means that there's padding which has to be applied
  else {
    // Adding 1 is needed because we're joining empty array spaces
    const padding = Array(paddingLength + 1).join(padChar);
    newStr = newStrLen > 0 ? str + padding : padding + str;
  }
  return newStr;
}

module.exports = pad;
