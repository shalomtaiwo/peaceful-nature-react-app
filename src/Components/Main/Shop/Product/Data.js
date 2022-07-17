import moringa from "./Assets/1.png";
import moringaDouble from "./Assets/2.png";
import moringaQuad from "./Assets/3.png";

const Data = {
  productData: [
    {
      id: "cl4i5halj000009jr328o8z60",
      img: moringa,
      title: "Moringa Capsule (Single)",
      desc: `Moringa is a miracle plant with many uses. It's said to have many health benefits
        including blood purification and cancer prevention. Research on Moringa is still being done, but it's been used
        for centuries in many countries. Moringa's benefits are said to come from its high levels of vitamins A, C, E,
        calcium, iron, zinc, and magnesium`,
      price: 12870 / 99,
      slug: "moringaone",
      reviews: [
        {
          user: "Jessica M.",
          review: `I have recently started taking Moringa Capsules 
            and it's been a fabulous experience so far. 
            I feel noticeably more energetic, focused throughout 
            the day and my stomach is just better. Plus 
            I have noticed visible changes in my skin too 
            which just made my experience all the better. 
            Moringa Capsules is plant-based and by coupling 
            it with a reduced calorie eating plan , 
            I've lost 20 pounds and 10 inches in my waist!`,
        },
      ],
    },
    {
      id: "cl4ntz724000009ladbva3zpi",
      img: moringaDouble,
      title: "Moringa Capsule Bundle (Two)",
      desc: `Moringa is a miracle plant with many uses. It's said to have many health benefits
        including blood purification and cancer prevention. Research on Moringa is still being done, but it's been used
        for centuries in many countries. Moringa's benefits are said to come from its high levels of vitamins A, C, E,
        calcium, iron, zinc, and magnesium`,
      price: 23760 / 99,
      slug: "moringatwo",
      reviews: [],
    },
    {
      id: "cl4nwn7sv000008mq6x8ta4u5",
      img: moringaQuad,
      title: "Moringa Capsule Bundle (Four)",
      desc: `Moringa is a miracle plant with many uses. It's said to have many health benefits
        including blood purification and cancer prevention. Research on Moringa is still being done, but it's been used
        for centuries in many countries. Moringa's benefits are said to come from its high levels of vitamins A, C, E,
        calcium, iron, zinc, and magnesium`,
      price: (21780 * 2) / 99,
      slug: "moringafour",
      reviews: [],
    },
  ],
};

export default Data;
