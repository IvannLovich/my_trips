import { handleSubmit } from "./js/formHandler";
import { drawTravel } from "./js/front";

import "./styles/main.scss";
import "./styles/header.scss";
import "./styles/footer.scss";

document.addEventListener("DOMContentLoaded", () => {
  const submitButton = document.getElementById("btn");

  submitButton.addEventListener("click", async (e) => {
    await handleSubmit(e);
    drawTravel();
  });
});
