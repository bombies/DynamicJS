const Command = require("../../structures/command");
const EmbedBuilder = require("../../structures/embedbuilder");
const GeneralUtils = require("../../utils/generalutils");


module.exports = new Command({
    name: '8ball',
    description: 'Determine your fate...',

    async run(message, args, client) {
        const eb = new EmbedBuilder();

        if (args.length == 0) {
            eb.setDescription('You must provide something I can determine.');
            message.reply({ embeds:[eb] });
            return;
        }

        const float = Math.random();
        
        const affirmativeAnswers = [
            "It is certain.",
            "It is decidedly so.",
            "Without a doubt.",
            "Yes definitely.",
            "You may rely on it.",
            "As I see it, yes.",
            "Most likely.",
            "Outlook good.",
            "Yes.",
            "Signs point to yes.",
        ];

        const nonCommittalAnswers = [
            "Reply hazy, try again.",
            "Ask again later.",
            "Better not tell you now.",
            "Cannot predict now.",
            "Concentrate and ask again.",
        ];

        const negativeAnswers = [
            "Don't count on it.",
            "My reply is no.",
            "My sources say no.",
            "Outlook not so good.",
            "Very doubtful.",
        ];

        if (float < 0.5) {
            eb.setDescription("🎱| " +  affirmativeAnswers[GeneralUtils.getRandomInt(affirmativeAnswers.length)]);
        } else if (float > 0.5 && float < 0.75) {
            eb.setDescription("🎱| " +  nonCommittalAnswers[GeneralUtils.getRandomInt(nonCommittalAnswers.length)]);
        } else if (float > 0.75 && float <= 1) {
            eb.setDescription("🎱| " +  negativeAnswers[GeneralUtils.getRandomInt(nonCommittalAnswers.length)]);
        }
        message.reply({ embeds: [eb] });
    },
});