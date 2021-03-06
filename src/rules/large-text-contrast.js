import formatMessage from "../format-message"
import contrast from "wcag-element-contrast"
import smallTextContrast from "./small-text-contrast"
import { onlyContainsLink } from "../utils/dom"

export default {
  test: (elem, config = {}) => {
    const disabled = config.disableContrastCheck == true
    const noText = elem.textContent.replace(/\s/g, "") === ""
    if (
      disabled ||
      noText ||
      onlyContainsLink(elem) ||
      !contrast.isLargeText(elem)
    ) {
      return true
    }
    return contrast(elem)
  },

  data: smallTextContrast.data,

  form: smallTextContrast.form,

  update: smallTextContrast.update,

  message: () =>
    formatMessage(
      "Text larger than 18pt (or bold 14pt) should display a minimum contrast ratio of 3:1."
    ),

  why: () =>
    formatMessage(
      "Text is difficult to read without suffcient contrast between the text and the background, especially for those with low vision."
    ),

  link: "https://www.w3.org/TR/WCAG20-TECHS/G17.html"
}
