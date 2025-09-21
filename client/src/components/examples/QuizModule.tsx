import QuizModule from '../QuizModule';

export default function QuizModuleExample() {
  // Todo: remove mock quiz questions when implementing real backend
  const mockQuestions = [
    {
      id: 1,
      question: "What is the main cause of climate change?",
      options: [
        "Natural weather patterns",
        "Greenhouse gas emissions from human activities", 
        "Solar radiation changes",
        "Ocean currents"
      ],
      correctAnswer: 1,
      explanation: "Climate change is primarily caused by increased greenhouse gas emissions from human activities like burning fossil fuels, deforestation, and industrial processes."
    },
    {
      id: 2,
      question: "Which of the following is considered a renewable energy source?",
      options: [
        "Coal",
        "Natural gas",
        "Solar power",
        "Nuclear power"
      ],
      correctAnswer: 2,
      explanation: "Solar power is a renewable energy source because it harnesses energy from the sun, which is naturally replenished and won't run out."
    },
    {
      id: 3,
      question: "What percentage of Earth's water is freshwater?",
      options: [
        "About 97%",
        "About 50%",
        "About 25%",
        "About 3%"
      ],
      correctAnswer: 3,
      explanation: "Only about 3% of Earth's water is freshwater, and most of that is frozen in ice caps and glaciers, making clean freshwater a precious resource."
    },
    {
      id: 4,
      question: "Which gas makes up the largest portion of greenhouse gas emissions?",
      options: [
        "Methane (CH4)",
        "Carbon dioxide (CO2)",
        "Nitrous oxide (N2O)",
        "Fluorinated gases"
      ],
      correctAnswer: 1,
      explanation: "Carbon dioxide (CO2) accounts for about 76% of global greenhouse gas emissions, primarily from burning fossil fuels and deforestation."
    },
    {
      id: 5,
      question: "What does 'biodiversity' refer to?",
      options: [
        "The variety of different species in an ecosystem",
        "The number of trees in a forest",
        "The amount of oxygen in the atmosphere",
        "The temperature changes in climate"
      ],
      correctAnswer: 0,
      explanation: "Biodiversity refers to the variety of all living things - plants, animals, fungi, and microorganisms - and the ecosystems they form. It's crucial for ecosystem health and stability."
    }
  ];

  const handleQuizComplete = (score: number, xpEarned: number) => {
    console.log(`Quiz completed with score: ${score}, XP earned: ${xpEarned}`);
  };

  return <QuizModule questions={mockQuestions} onQuizComplete={handleQuizComplete} />;
}