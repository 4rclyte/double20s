//there be lists below!
var collateral = [
"stomach","liver","small intestine","large intestine","rectum","anus","esophagus","pharynx",
"left lung","right lung","nose",
"left kidney","right kidney","gall bladder","urethra","urinary bladder",
"pituitary gland","adrenal gland","thyroid gland","pancreas","parathyroid","prostate",
"heart","blood vessels","spleen",
"tongue","nose","left ear","right ear","left eye","right eye",
"uterus","left testicle","right testicle","ovaries","left mammary gland","right mammary gland",
"brain","spinal cord","cerebellum",
"hair","left ass cheek","right ass cheek","left hand","right hand","left foot","right foot",
"left twix","butterfinger","navel","left shin bone","right shin bone","human horn","dank memes",
"sense of direction","sense of wonder","fashion sense","swagger","sense of humor","sense of time",
"funny bone","eyebrows","scrotum","tattooed areas","lips","chin","left ankle","right ankle","neck",
"left shoulder","right shoulder","torso","left leg","right leg","right arm","left arm","scalp",
"hair","thorax","left thigh","right thigh","left forearm","right forearm","face","adam's apple",
"groin","mouth","forehead","sense of decency","diaphragm","mandible","pelvis","appendix","ribs",
"skull","sweat glands","muscles","larynx","pelvic nerve","bone marrow","veins","Samsung Galaxy Note 7"
];

var situation = [
"It's your turn to say a fun fact about yourself when suddenly explodes your ",
"The waitress returns with the bill and one of the items owed is your ",
"And you would have gotten away with it if it weren't for your failing ",
"No big deal, you can definitely live without a ",
"I'll pay you back I swear...anything but my ",
"The burly barbarian starts massaging your ",
"A stray condor comes flying through the room and hits you right in the ",
"The proprieter wants to rent ad space on your "
];

//initiates a # of rounds depending on how many tokens given
function play(tokens, bet) {
    //hide previous message
    $('#feelsBadMan').children().remove();    

    //inputs
    var bet = parseInt($('#bet').val());
    var tokens = parseInt($('#count').val());
   
    //declare variables
    var d1, d2, total, isActive, roundCount, highScore, avgScore, winnings, winCount, lossCount, winRate, payout, maxPayout, avgPayout, tieCount, bestRoundRecount, recount, playCount;
    var results = [];
    var payouts = [];
    playCount = tokens;
    highScore = 0;
    avgScore = 0;
    winnings = 0;
    winCount = 0;
    lossCount = 0;
    winRate = 0; 
    maxPayout = 0;
    avgPayout = 0;
    tieCount = 0;

    //continuously play until out of tokens
    for (var i = 0; i < tokens; i++)
    {
        //set variables for new round
        isActive = true;
        total = 0;
        payout = 0;
        roundCount = 0;
        recount = "";

        //single round of play
        while(isActive) {
            d1 = roll(20);
            d2 = roll(20);

            if (d1 === d2) {
                total += d1 + d2 + 10;
            }
            else if (d1-10 === d2 || d1+10 === d2) {
                total += d1 + d2;
            }
            else {
                total += d1 + d2;
                isActive = false;
            }
            roundCount++;

            if(roundCount === 1)
                recount += "You rolled " + d1 + " and " + d2 + ". ";
            else {
                recount += "\n" + "Then you rolled " + d1 + " and " + d2 + ". ";
            }
        }

        //end of round stuff
        if (total < 26) {
            payout = bet;
            winnings -= payout;
            lossCount++;

            if(total === 3 && playCount <= 100)
                feelsBadMan(total);
        }
        else if (total >= 26 && total < 40) {
            payout = bet;
            winnings += payout;
            winCount++;
        }
        else if (total >= 40 && total < 100) {
            payout = bet * (Math.floor(total / 10) - 1);
            winnings += payout;
            winCount++;
        }
        else if (total >= 100) {
            console.log('M-m-m-monster kill!!');
            payout = bet * (Math.floor(total / 10) * roundCount);
            winnings += payout;
            winCount++;
        }

        //new high score?
        if (total > highScore) {
            highScore = total;
            bestRoundRecount = recount;
        }

        //new jackpot?
        if (payout > maxPayout && winCount > 0)
            maxPayout = payout;

        //add the game result to the array
        results.push(total);
        payouts.push(payout);
    }//out of tokens

    //avgerage score
    avgScore = results.reduce(function(sum, a) { return sum + a },0)/(results.length||1);

    //average payout
    avgPayout = payouts.reduce(function(sum, a) { return sum + a },0)/(payouts.length||1);

    //winrate
    winRate = (winCount / tokens) * 100;
    
    //display results
    $('#gamesRan').text(tokens + ' times');
    $('#avgScore').text(avgScore.toFixed(2));
    $('#avgPayout').text(avgPayout.toFixed(2) + 'g');
    $('#highScore').text(highScore);
    $('#winRate').text(winRate.toFixed(2) + '%');
    $('#winnings').text(winnings + 'g');
    $('#jackpot').text(maxPayout + 'g');
    $('#bestRound').text('Best round: ' + bestRoundRecount);

    console.log('\nWins: ' + winCount);
    console.log('Losses: ' + lossCount);
    console.log('Max Payout: ' + maxPayout);
    console.log('Average Payout ' + avgPayout);
    console.log('Winnings: ' + winnings);
    console.log(bestRoundRecount + "\nFor a total of " + highScore + ".");
}

//roll an (n)Sided die
function roll(n) {
    return Math.floor((Math.random() * n) + 1);
}

//fetch random item from an array
function getRandom(list) {
    return list[Math.floor((Math.random()*list.length))];
} 

//something bad happens
function feelsBadMan(n) {
    if(n) $('#feelsBadMan').children().remove();
    
    //smash together a random situation with a thing
    var happening = getRandom(situation) + getRandom(collateral) + ".";

    $('#feelsBadMan').append('<p class="badStuff">' + happening + '</p>');
    $('.badStuff').removeClass('hidden');

    console.log(happening);
}