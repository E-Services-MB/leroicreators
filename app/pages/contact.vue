<script setup lang="ts">
interface FormState {
  name: string;
  contact: string;
  subject: string;
  message: string;
}

const state = reactive<FormState>({
  name: "",
  contact: "",
  subject: "",
  message: "",
});

const saveDiapo = async () => {
  const { data: contacts } = await $fetch("/api/contacts", {
    method: "POST",
    body: state,
  });
  state.name = "";
  state.contact = "";
  state.message = "";
  state.subject = "";
};
</script>
<template>
  <NuxtLayout>
    <section id="contact">
      <div class="box">
        <div class="box col contact-info justify-center items-start" id="right">
          <h2>Contact Info</h2>
          <p>Ouvert : Lundi - Samedi \ 08h - 18h</p>
          <a href="mailto:contact@leroicreators.com"
            >E-Mail : contact@leroicreators.com</a
          >
          <br />
          <a href="tel:+241 62 64 08 30">Telephone : +241 02 64 08 30</a>
          <ul class="social-links">
            <li>
              <a
                href="https://www.facebook.com/profile.php?id=61578331243469&mibextid=ZbWKwL"
                target="_blank"
              >
                <svg
                  viewBox="8 7 45 45"
                  class="unvisible"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g data-name="Layer 6">
                    <path
                      d="M30.54 51H17.22a4.64 4.64 0 0 1-4.63-4.62v-29.1a4.64 4.64 0 0 1 4.63-4.63H45.8M50.43 17.28v29.08A4.64 4.64 0 0 1 45.8 51h-9"
                      fill="none"
                      stroke="#000000"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2px"
                      class=""
                    ></path>
                    <circle
                      cx="50.48"
                      cy="13.95"
                      r="1"
                      fill="#000000"
                      class="fill-000000"
                    ></circle>
                    <path
                      d="M30.54 51V38.51h-4.4v-5.94h4.4v-5.73a6 6 0 0 1 6-6h6.23v5.65h-4.56A1.47 1.47 0 0 0 36.74 28v4.54h6v6h-6V51"
                      fill="none"
                      stroke="#000000"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2px"
                      class=""
                    ></path>
                  </g>
                </svg>
                <svg
                  viewBox="8 7 45 45"
                  class="visible"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g data-name="Layer 6">
                    <path
                      d="M30.54 51H17.22a4.64 4.64 0 0 1-4.63-4.62v-29.1a4.64 4.64 0 0 1 4.63-4.63H45.8M50.43 17.28v29.08A4.64 4.64 0 0 1 45.8 51h-9"
                      fill="none"
                      stroke="#ffffff"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2px"
                      class="stroke-000000"
                    ></path>
                    <circle
                      cx="50.48"
                      cy="13.95"
                      r="1"
                      fill="#ffffff"
                      class="fill-000000"
                    ></circle>
                    <path
                      d="M30.54 51V38.51h-4.4v-5.94h4.4v-5.73a6 6 0 0 1 6-6h6.23v5.65h-4.56A1.47 1.47 0 0 0 36.74 28v4.54h6v6h-6V51"
                      fill="none"
                      stroke="#ffffff"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2px"
                      class="stroke-000000"
                    ></path>
                  </g>
                </svg>
              </a>
            </li>
            <li>
              <a
                href="https://whatsapp.com/channel/0029VaLCgKfI1rccpYdtok3f"
                target="_blank"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 256 256"
                  id="whatsapp"
                >
                  <rect width="256" height="256" fill="none"></rect>
                  <path
                    fill="none"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="8"
                    d="M45.429,176.99811A95.95978,95.95978,0,1,1,79.00277,210.5717l.00023-.001L45.84643,220.044a8,8,0,0,1-9.89-9.89l9.47331-33.15657Z"
                  ></path>
                  <path
                    fill="none"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="8"
                    d="M152.11369,183.99992a80,80,0,0,1-80.11361-80.11361A27.97622,27.97622,0,0,1,100,76h0a6.89265,6.89265,0,0,1,5.98451,3.47295l11.69105,20.45931a8,8,0,0,1-.086,8.08508l-9.38907,15.64844h0a48.18239,48.18239,0,0,0,24.13373,24.13373l0,0,15.64841-9.389a8,8,0,0,1,8.08508-.086l20.45931,11.691A6.89265,6.89265,0,0,1,180,156v0A28.081,28.081,0,0,1,152.11369,183.99992Z"
                  ></path>
                </svg>
              </a>
            </li>
            <li>
              <a
                href="https://vm.tiktok.com/ZS9RWq288WK4V-xWR8k/"
                target="_blank"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  enable-background="new 0 0 100 100"
                  viewBox="0 0 100 100"
                  id="tiktok"
                >
                  <g id="Layer_2">
                    <path
                      d="M91.97,25.943c-0.293-0.275-0.679-0.416-1.09-0.391c-5.671,0.37-10.224-0.797-13.898-3.569
			c-4.972-3.753-7.35-9.173-7.948-18.125C68.982,3.095,68.347,2.5,67.58,2.5H52.555c-0.804,0-1.456,0.652-1.456,1.456
			c0.007,19.562,0.016,36.716-0.036,57.302c0.029,1.904,2.871,1.932,2.913,0.008c0.053-20.166,0.038-36.758,0.036-55.853h12.22
			c0.596,12.428,8.518,23.659,23.286,23.113c0,0,0,12.872,0,12.872c-6.227-0.428-12.185-0.72-17.88-3.711
			c-1.501-0.476-4.689-2.964-5.259-0.176c-0.16,1.273,0.188,22.01,0.122,28.612c-0.79,35.709-51.165,39.173-55.899,2.773
			c-1.414-14.44,9.694-28.107,24.257-29.845c1.91-0.263,1.548-3.09-0.345-2.892C18.416,38.079,6.138,53.201,7.704,69.181
			c5.225,40.104,60.837,36.295,61.71-3.09c0.064-7.238-0.213-21.13-0.158-26.276c2.77,1.224,5.482,2.547,8.368,3.17
			c4.387,0.951,8.801,1.016,13.205,1.459c0.834,0.102,1.62-0.612,1.602-1.449c0,0,0-15.987,0-15.987
			C92.431,26.604,92.264,26.219,91.97,25.943z"
                    ></path>
                    <path
                      d="M22.926,66.753c0.262,17.034,23.632,21.77,30.106,5.724c0.288-0.751-0.088-1.593-0.839-1.88
			c-0.752-0.289-1.593,0.087-1.881,0.839c-5.238,13.011-24.256,9.18-24.473-4.691c-0.017-6.267,4.321-11.536,10.315-12.53
			c2.166-0.353,4.702-0.03,7.012-0.041c0.805,0,1.456-0.652,1.456-1.456v-15.16c-0.029-1.9-2.879-1.926-2.913,0
			c0,0,0,13.674,0,13.674C31.851,49.856,22.964,56.295,22.926,66.753z"
                    ></path>
                  </g>
                </svg>
              </a>
            </li>
            <li>
              <a
                href="https://youtube.com/@leroicreators?si=krL0VDXTuzQyEm8s"
                target="_blank"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  enable-background="new 0 0 32 32"
                  viewBox="0 0 32 32"
                  id="youtube"
                >
                  <path
                    fill=""
                    d="M16,27c-0.001,0-0.003,0-0.005,0c-0.309-0.003-7.588-0.074-9.904-0.302
		c-0.146-0.026-0.269-0.041-0.407-0.058c-0.774-0.096-2.069-0.256-3.109-1.377c-0.965-1.004-1.269-3.144-1.281-3.235
		C1.281,21.919,1,19.545,1,17.128v-2.266c0-2.418,0.281-4.792,0.293-4.892C1.307,9.871,1.61,7.731,2.581,6.72
		c1.118-1.205,2.363-1.329,3.032-1.396l0.175-0.019C9.841,5.003,15.933,5,15.994,5c0.073,0,6.165,0.003,10.195,0.303l0.198,0.021
		c0.669,0.066,1.914,0.19,3.037,1.402c0.965,1.005,1.27,3.145,1.282,3.235C30.719,10.07,31,12.444,31,14.862v2.266
		c0,2.418-0.281,4.792-0.293,4.892c-0.014,0.099-0.318,2.239-1.29,3.25c-1.116,1.205-2.36,1.33-3.029,1.397l-0.176,0.019
		C22.159,26.988,16.062,27,16,27z M16.006,6C15.934,6,9.878,6.003,5.885,6.3L5.712,6.319C5.137,6.376,4.175,6.472,3.309,7.406
		C2.682,8.06,2.357,9.57,2.285,10.098C2.283,10.113,2,12.506,2,14.862v2.266c0,2.358,0.283,4.749,0.286,4.772
		c0.072,0.52,0.398,2.032,1.016,2.676c0.797,0.859,1.784,0.981,2.505,1.071c0.164,0.021,0.309,0.039,0.428,0.062
		c2.21,0.216,9.591,0.289,9.767,0.291c0.16,0,6.153-0.015,10.113-0.31l0.174-0.019c0.575-0.058,1.537-0.154,2.402-1.088
		c0.627-0.653,0.952-2.164,1.025-2.691C29.717,21.876,30,19.484,30,17.128v-2.266c0-2.356-0.283-4.749-0.286-4.773
		c-0.072-0.52-0.399-2.032-1.018-2.677c-0.871-0.94-1.833-1.036-2.408-1.093l-0.197-0.021C22.122,6.003,16.066,6,16.006,6z"
                  ></path>
                  <path
                    fill=""
                    d="M12.5,20c-0.095,0-0.19-0.027-0.272-0.081C12.085,19.827,12,19.669,12,19.5v-5.969
		c0-0.276,0.224-0.5,0.5-0.5s0.5,0.224,0.5,0.5v5.199l7.269-3.23l-7.972-3.543c-0.252-0.112-0.366-0.408-0.254-0.66
		c0.112-0.252,0.408-0.366,0.66-0.254l9,4C21.884,15.124,22,15.302,22,15.5s-0.116,0.376-0.297,0.457l-9,4
		C12.638,19.986,12.569,20,12.5,20z"
                  ></path>
                </svg>
              </a>
            </li>
          </ul>
        </div>
        <form>
          <div class="box" style="padding: 0">
            <input type="text" placeholder="Noms ..." v-model="state.name" />
            <input
              type="text"
              placeholder="Email ou Telephone ..."
              v-model="state.contact"
            />
            <input
              type="text"
              placeholder="Sujet ..."
              v-model="state.subject"
            />
          </div>
          <textarea
            v-model="state.message"
            rows="5"
            cols="5"
            placeholder="Message ..."
          ></textarea>
          <button @click.prevent="saveContact" type="submit">Envoyer</button>
        </form>
      </div>
    </section>
  </NuxtLayout>
</template>
<style scoped>
#contact {
  padding: 2em 0;
}
form {
  width: max-content;
  padding: 1em;
  display: flex;
  flex-direction: column;
  gap: 1em;

  * {
    font-family: "Tanker";
    padding: 1.5em 1em;
    font-size: 1.2em;
  }

  input {
    width: 33%;
  }

  textarea {
  }

  button {
    font-size: 1.4em;
  }
}

#right {
  width: 45%;
  font-size: 1.7em;

  a:hover {
    letter-spacing: 0.2em;
  }
}

ul.social-links {
  display: flex;
  justify-content: start;
  align-items: center;
  gap: 1em;

  padding-left: 0;
}

.social-links li {
  border: 1px solid white;
  text-align: center;
  padding: 0.7em;
  width: 35px;
  transition: all 0.5s ease-in-out;
}

.social-links a svg {
  width: 30px;
  height: 30px;
  fill: black;
    stroke:black;
}

.white {
  fill: white;
}

.social-links li:hover svg {
  width: 30px;
  height: 30px;
  fill: white;
    stroke:white;
}

.visible {
  display: none;
}

.social-links li:hover .visible {
  display: inline-block;
}

.social-links li:hover .unvisible {
  display: none;
}

.social-links li:nth-child(1):hover {
  background-color: #3a589b;
  scale: 1.3;
}

.social-links li:nth-child(2):hover {
  background-color: #128c7e;
  scale: 1.3;
}

.social-links li:nth-child(3):hover {
  background-color: #010409;
  scale: 1.3;
}

.social-links li:nth-child(4):hover {
  background-color: #ff0033;
  scale: 1.3;
}

@media screen and (340px < width <= 700px) {
  #contact {
    .box {
      flex-direction: column;
    }

    form,
    #right {
      width: 100%;
      padding: 0;
      align-items: center;
    }

    form {
      input {
        width: 90%;
      }
      textarea {
        margin-left: 1em;
        width: 80%;
      }
      button {
        width: 80%;
        margin-left: 1em;
      }
    }
  }
}
</style>
