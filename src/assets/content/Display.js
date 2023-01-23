const DisplayDialogue = {
  greeting: {
    display: true,
    message: {
      title: `Welcome to "Where's the Pokemon?"`,
      content: `Locate each one of the pokemon avatars in the 'find list' in the Poke-collage. Click on the Pokemon in the collage and select the matching avatar. A successful match will remove the pokemon from the find list. Clear the list to win!`,
      buttonContent: "Okay",
    },
  },
  gameComplete: {
    display: true,
    message: {
      title: `Congrats you caught 'em all!`,
      content: `You've completed the challenge. If you've placed in the top 10 you're now in the record books`,
      buttonContent: "Sounds good!",
    },
  },
  goodPick: {
    display: true,
    message: {
      title: `Nice!`,
      content: `You've picked correctly.`,
      buttonContent: "Okay",
    },
  },
  badPick: {
    display: true,
    message: {
      title: `Uh-oh...`,
      content: `You didn't click the right Pokemon, try again.`,
      buttonContent: "Okay",
    },
  },
};

export default DisplayDialogue