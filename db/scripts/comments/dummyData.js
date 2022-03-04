import knownFakeIds from "../../../utils/knownFakes.js";
import randomComments from "../../../utils/randomComments.js";

const randomLongLat = [
  "50.827427,-0.153502",
  "50.823406,-0.151734",
  "50.825364,-0.154710",
  "50.826096,-0.157245",
  "50.824063,-0.162638",
  "50.826858,-0.159888",
  "50.823120,-0.150290",
  "50.823991,-0.156877",
  "50.826712,-0.155048",
];

const comments = knownFakeIds.map((v, i) => {
  return {
    user_id: v.user_id,
    location: randomLongLat[i],
    comment: randomComments[i],
    date: "",
    visibility: true,
  };
});

export default comments;
//
// const comments = [
//   {
//     user_id: 3,
//     location: "50.827427,-0.153502",
//     comment: "Don't put peanut butter on the dog's nose.",
//     date: "",
//     visibility: true,
//   },
//   {
//     user_id: 5,
//     location: "50.823406,-0.151734",
//     comment: "She wrote him a long letter, but he didn't read it.",
//     date: "",
//     visibility: true,
//   },
//   {
//     user_id: 1,
//     location: "50.825364,-0.154710",
//     comment:
//       "As the years pass by, we all know owners look more and more like their dogs.",
//     visibility: true,
//   },
// ];

// Local: 50.825004,-0.163897
// Local: 50.823646, -0.153599
// Local: 50.824225, -0.153993
// Local: 50.826288, -0.153534
// Local: 50.827840, -0.157635
// Local: 50.828546,-0.152178
// Local: 50.824941, -0.158255
// Local: 50.821981, -0.150766
// Local: 50.821981, -0.150566
// Local: 50.825000, -0.162000
// Local: 50.823842, -0.161389
