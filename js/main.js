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

var livingAdjective = [
"slimy","sultry","bitchy","belligerent","boastful","cynical","dishonest","domineering","fussy",
"jealous","impulsive","grumpy","greedy","flirtatious","indescreet","lazy","miserly","moody","nasty",
"naughty","nervous","overemotional","perverse","pessimistic","quick-tempered","rude","sarcastic","secretive",
"silly","sneaky","stingy","stubborn","stupid","superficial","tactless","touchy","unreliable","vague","vain",
"vulgar","vengeful","adventurous","amusing","courteous","diplomatic","easygoing","emotional","energetic",
"exuberant","enthusiastic","fealress","forceful","imaginative","intelligent","impartial","optimistic",
"patient","persistent","pioneering","philisophical","practical","powerful","modest","practical","passionate",
"quick-witted","shy","romantic","resourceful","sincere","straightforward","tough","versatile","witty"
];

var livingNoun = [
"fighter","elf","human","half-elf","minstrel","barkeep","courier","barbarian","swindler","wizard","mage",
"courtesan","ranger","hunter","druid","woodsman","man","woman","child","cleric","priest","baron","lady",
"nobleman","noblewoman","farmer","artist","fisherman","blacksmith","town crier","cutpurse","merchant",
"soldier","guard","knight","sailor","pissprophet","innkeeper","maid","gnome","halfling","half-orc","wetnurse",
"ratcatcher","royal food taster","beggar","pilgrim","urchin","transient","vagabond","banana swilling poop flinger"
];

var punctuation = ["!","!","...","...",".",".",".",".",".",".","?","?!"];

//also global vars
var totalWinnings = 0;
var totalGamesPlayed = 0;

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

            if(roundCount === 1) {
                recount += d1 + " and " + d2 + " for " + total + ". ";
            } else {
                if(total === 69) { recount += "\n" + "Then " + d1 + " and " + d2 + " for " + total + ". Nice. "; }
                else { recount += "\n" + "Then " + d1 + " and " + d2 + " for " + total + ". "; }
            }
        }

        //end of round stuff
        if (total < 25) {
            payout = 0 - bet;
            winnings += payout;
            lossCount++;

            if(total === 3 && playCount <= 100)
                feelsBadMan(total);
        }
        else if (total >= 25 && total < 30) {
            payout = bet;
            winnings += payout;
            winCount++;
        }
        else if (total >= 30 && total < 100) {
            payout = bet * (Math.floor(total / 10) - 2);
            winnings += payout;
            winCount++;
            
            if (total === 69) {
                tempAlert("You scored 69. Nice.", 1500);  
            }
        }
        else if (total >= 100) {
            console.log('M-m-m-monster kill!!');
            payout = bet * (Math.floor(total / 10) + roundCount);
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
        totalWinnings += payout;
    }//out of tokens

    //avgerage score
    avgScore = results.reduce(function(sum, a) { return sum + a },0)/(results.length||1);

    //average payout
    avgPayout = payouts.reduce(function(sum, a) { return sum + a },0)/(payouts.length||1);

    //winrate
    winRate = (winCount / tokens) * 100;

    //running totals
    totalGamesPlayed += playCount;
    
    //display results
    $('#gamesRan').text(tokens + ' times');
    $('#avgScore').text(avgScore.toFixed(2));
    $('#avgPayout').text(avgPayout.toFixed(2) + 'g');
    $('#highScore').text(highScore);
    $('#winRate').text(winRate.toFixed(2) + '%');
    $('#winnings').text(winnings + 'g');
    $('#jackpot').text(maxPayout + 'g');
    $('#bestRound').text('Best round: ' + bestRoundRecount);
    $('#totalWinnings').text(totalWinnings);
    $('#gamesPlayed').text(totalGamesPlayed);

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
    
    var happening = "";
    //smash together a random situation with a thing
    switch(roll(10)) {
        case 9:
            happening = "It's your turn to say a fun fact about yourself when suddenly explodes your " + getRandom(collateral) + getRandom(punctuation);
            break;
        case 8:
            happening =  "The " + getRandom(livingAdjective) + " " + getRandom(livingNoun) + " returns with the bill and one of the items owed is your " + getRandom(collateral) + getRandom(punctuation);
            break;
        case 7:
            happening = "And you would have gotten away with it if it weren't for your " + getRandom(livingAdjective) + " " + getRandom(collateral) + getRandom(punctuation);
            break;
        case 6:
            happening = "No big deal, you can definitely live without a " + getRandom(collateral) + getRandom(punctuation);
            break;
        case 5:
            happening = "I'll pay you back I swear...anything but my "  + getRandom(collateral) + getRandom(punctuation);
            break;
        case 4:
            happening = "The " + getRandom(livingAdjective) + " " + getRandom(livingNoun) + " starts massaging your "  + getRandom(collateral) + getRandom(punctuation);
            break;
        case 3:
            happening = "A " + getRandom(livingAdjective) + " " + getRandom(livingNoun) +  " comes flying through the room and hits you right in the " + getRandom(collateral) + getRandom(punctuation);
            break;
        case 2:
            happening = "You barely overhear the " + getRandom(livingAdjective) + " " + getRandom(livingNoun) + " say something about your " + getRandom(collateral) + getRandom(punctuation);
            break;
        case 1:
            happening = "The " + getRandom(livingNoun) + " wants to rent ad space on your " + getRandom(collateral) + getRandom(punctuation);
            break;
        default:
            happening = "A " + getRandom(livingAdjective) + " " + getRandom(livingNoun) + " and a " + getRandom(livingAdjective) + " " + getRandom(livingNoun) + " eye you menacingly" + getRandom(punctuation);
    }

    $('#feelsBadMan').append('<p class="badStuff">' + happening + '</p>');
    $('.badStuff').removeClass('hidden');

    console.log(happening);
}

function tempAlert(msg, duration)
{
     var el = document.createElement("div");
     el.setAttribute("class","centered");
     el.innerHTML = msg;
     setTimeout(function(){
      el.parentNode.removeChild(el);
     },duration);
     document.body.appendChild(el);
}
