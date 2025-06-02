TODO
base time 40 min (45-60min), first 5-10 pilot, full data 20-40 people, 
16 base, 0.5 bonus each on pilot, 

DONE 
last practice of comb page answer incorrect
randomize demo examples (especially combo page)
hide button note after click confirm in test
add note during the comb demo/practice that order is important
resolve data storage
double check transformer/baseline performance
disable empty submit 
redirection link


Upload
scp -r /Users/yichen/Downloads/meta_learn_dax/ cocodev@207.244.121.250:/home/cocodev/apps/experiments/yichenli/

Download
scp -r cocodev@207.244.121.250:/home/cocodev/apps/experiments/yichenli/meta_learn_dax/data /Users/yichen/Downloads/meta_learn_dax/

URL
https://cocodev.opalstacked.com/experiments/yichenli/meta_learn_dax/index.html


This is an experiment about learning novel word-token associations and functional operations.
The experiment follows a meta-learning design. 
There are 3 episodes in total. 
In each episode, a different set of word/token primitives, and a different set of mappings/associations (i.e. the grammar) will be used.

Universe of primitives for the entire experiment:
- Universe of input symbol (nonsense word) IDs: 1, 2, 3, ..., 21
- Universe of output symbol (emoji token) IDs: a, b, c, ..., l
- Universe of function IDs: X (repeat x3), Y (interleave), Z (reverse)

Remember, each episode uses a different set of input/output primitives and their mappings (grammar).

The first episode is training, so feedback (correct solutions) of the practice examples will be given.
The second episode is an extended training, preparing participants to get familiar with the meta-learning design. The grammar will be different from the first episode, but feedback will still be provided.
The third episode is testing, where a new grammar will be used, and no feedback will be given.
We are specifically interested in human performance in the third episode.

The underlying grammar for each episode will not be displayed to participants directly. Instead, participants need to infer the correct grammar (i.e. the input-output associations, input-function associations, and the order to apply functions in combinations) from the demonstrations. 
In the first 2 episodes, participants will get to practice on new examples and receive feedback. But the 3rd episode does not have any practice, and only has test examples with no feedback.


Episode 1 (Grammar 1) - Training
	Primitives
	- Input symbol: 1, 2, 3, 4, 5, 6, 7
	- Output symbol: a, b, c, d
	- Functions: X, Y, Z, and their combinations
	Grammar
		1 -> a
		2 -> b
		3 -> c
		4 -> d
		5 -> X
		6 -> Y
		7 -> Z
		arg1 X -> arg1 arg1 arg1
		arg1 Y arg2 -> arg1 arg2 arg1
		arg1 Z arg2 -> arg2 arg1
		arg1 arg2 -> arg1 arg2
		(arg1 and arg2 are variables that can mean any arbitrary input symbols in the universe of this episode)
		Function priorities during combination: first X, then Y, finally Z
	Page 1 (trivial word-token)
		Demo: 1 -> a
		Demo: 2 -> b
		Demo: 3 -> c
		Demo: 4 -> d
	Page 2 (function X)
		Demo: 1 5 -> a a a
		Demo: 3 5 -> c c c
		Practice: 2 5 -> b b b
		Practice: 4 5 -> d d d
	Page 3 (function Y)	
		Demo: 1 6 2 -> a b a
		Demo: 1 6 3 -> a c a
		Practice: 1 6 4 -> a d a
		Practice: 3 6 4 -> c d c
	Page 4 (function Z)
		Demo: 1 7 2 -> b a
		Demo: 2 7 3 -> c a
		Practice: 1 7 4 -> d a
		Practice: 3 7 4 -> d c
	Page 5 (function combinations)
		Demo (1, 2): arg1 X Y arg2 -> (arg1 X) Y arg2 -> arg1 arg1 arg1 arg2 arg1 arg1 arg1
		Demo (1, 3): arg1 Y arg2 X -> arg1 Y (arg2 X) -> arg1 arg1 arg1 arg3 arg1 arg1 arg1
		Demo (1, 2): arg1 X Z arg2 -> (arg1 X) Z arg2 -> arg2 arg1 arg1 arg1
		Demo (1, 3): arg1 Z arg2 X -> arg1 Z (arg2 X) -> arg2 arg2 arg2 arg1
		Demo (1, 2, 3): arg1 Y arg2 Z arg3 -> (arg1 Y arg2) Z arg3 -> arg3 arg1 arg2 arg1
		Demo (1, 2, 3): arg1 Z arg2 Y arg3 -> arg1 Z (arg2 Y arg3) -> arg2 arg3 arg2 arg1
		Practice (2, 3): arg1 X Y arg2 -> (arg1 X) Y arg2 -> arg1 arg1 arg1 arg2 arg1 arg1 arg1
		Practice (3, 4): arg1 Y arg2 X -> arg1 Y (arg2 X) -> arg1 arg2 arg2 arg2 arg1
		Practice (2, 3): arg1 X Z arg2 -> (arg1 X) Z arg2 -> arg2 arg1 arg1 arg1
		Practice (3, 4): arg1 Z arg2 X -> arg1 Z (arg2 X) -> arg2 arg2 arg2 arg1
		Practice (1, 3, 4): arg1 Y arg2 Z arg3 -> (arg1 Y arg2) Z arg3 -> arg3 arg1 arg2 arg1
		Practice (2, 3, 4): arg1 Z arg2 Y arg3 -> arg1 Z (arg2 Y arg3) -> arg2 arg3 arg2 arg1
		Practice (1, 2, 4): arg1 Y arg2 Z arg3 X -> (arg1 Y arg2) Z (arg3 X) -> arg3 arg3 arg3 arg1 arg2 arg1
		Practice (1, 3, 4): arg1 X Z arg2 Y arg3 -> (arg1 X) Z (arg2 Y arg3) -> arg2 arg3 arg2 arg1 arg1 arg1
		Practice (2, 3, 4): arg1 Z arg2 Y arg3 X -> arg1 Z (arg2 Y (arg3 X)) -> arg2 arg3 arg3 arg3 arg2 arg1
		(randomize argument-token mapping in the parenthesis)


Episode 2 (Grammar 3) - Familiarization
	Primitives
	- Input symbol: 8, 9, 10, 11, 12, 13, 14
	- Output symbol: e, f, g, h
	- Functions: X, Y, Z, and their combinations
	Grammar
		8 -> e
		9 -> f
		10 -> g
		11 -> h
		12 -> X
		13 -> Y
		14 -> Z
		arg1 X -> arg1 arg1 arg1
		arg1 Y arg2 -> arg1 arg2 arg1
		arg1 Z arg2 -> arg2 arg1
		arg1 arg2 -> arg1 arg2
		(arg1 and arg2 are variables that can mean any arbitrary input symbols in the universe of this episode)
		Function priorities during combination: first X, then Y, finally Z
	Page 1 (trivial word-token)
		Demo: 8 -> e
		Demo: 9 -> f
		Demo: 10 -> g
		Demo: 11 -> h
	Page 2 (function X)
		Demo: 8 12 -> e e e
		Demo: 10 12 -> g g g
		Practice: 9 12 -> f f f
		Practice: 11 12 -> h h h
	Page 3 (function Y)	
		Demo: 8 13 9 -> e f e
		Demo: 8 13 10 -> e g e
		Practice: 8 13 11 -> e h e
		Practice: 10 13 11 -> g h g
	Page 4 (function Z)
		Demo: 8 14 9 -> f e
		Demo: 9 14 10 -> g e
		Practice: 8 14 11 -> h e
		Practice: 10 14 11 -> h g
	Page 5 (function combinations)
		Demo (8, 9): arg1 X Y arg2 -> (arg1 X) Y arg2 -> arg1 arg1 arg1 arg2 arg1 arg1 arg1
		Demo (8, 10): arg1 Y arg2 X -> arg1 Y (arg2 X) -> arg1 arg1 arg1 arg3 arg1 arg1 arg1
		Demo (8, 9): arg1 X Z arg2 -> (arg1 X) Z arg2 -> arg2 arg1 arg1 arg1
		Demo (8, 10): arg1 Z arg2 X -> arg1 Z (arg2 X) -> arg2 arg2 arg2 arg1
		Demo (8, 9, 10): arg1 Y arg2 Z arg3 -> (arg1 Y arg2) Z arg3 -> arg3 arg1 arg2 arg1
		Demo (8, 9, 10): arg1 Z arg2 Y arg3 -> arg1 Z (arg2 Y arg3) -> arg2 arg3 arg2 arg1
		Practice (9, 10): arg1 X Y arg2 -> (arg1 X) Y arg2 -> arg1 arg1 arg1 arg2 arg1 arg1 arg1
		Practice (10, 11): arg1 Y arg2 X -> arg1 Y (arg2 X) -> arg1 arg2 arg2 arg2 arg1
		Practice (9, 10): arg1 X Z arg2 -> (arg1 X) Z arg2 -> arg2 arg1 arg1 arg1
		Practice (10, 11): arg1 Z arg2 X -> arg1 Z (arg2 X) -> arg2 arg2 arg2 arg1
		Practice (8, 10, 11): arg1 Y arg2 Z arg3 -> (arg1 Y arg2) Z arg3 -> arg3 arg1 arg2 arg1
		Practice (9, 10, 11): arg1 Z arg2 Y arg3 -> arg1 Z (arg2 Y arg3) -> arg2 arg3 arg2 arg1
		Practice (8, 9, 11): arg1 Y arg2 Z arg3 X -> (arg1 Y arg2) Z (arg3 X) -> arg3 arg3 arg3 arg1 arg2 arg1
		Practice (8, 10, 11): arg1 X Z arg2 Y arg3 -> (arg1 X) Z (arg2 Y arg3) -> arg2 arg3 arg2 arg1 arg1 arg1
		Practice (9, 10, 11): arg1 Z arg2 Y arg3 X -> arg1 Z (arg2 Y (arg3 X)) -> arg2 arg3 arg3 arg3 arg2 arg1


Episode 3 (Grammar 3) - Testing
	Primitives
	- Input symbol: 15, 16, 17, 18, 19, 20, 21
	- Output symbol: i, j, k, l
	- Functions: X, Y, Z, and their combinations
	Grammar
		15 -> i
		16 -> j
		17 -> k
		18 -> l
		19 -> X
		20 -> Y
		21 -> Z
		arg1 X -> arg1 arg1 arg1
		arg1 Y arg2 -> arg1 arg2 arg1
		arg1 Z arg2 -> arg2 arg1
		arg1 arg2 -> arg1 arg2
		(arg1 and arg2 are variables that can mean any arbitrary input symbols in the universe of this episode)
		Function priorities during combination: first X, then Y, finally Z
	Page 1 (trivial word-token)
		Demo: 15 -> i
		Demo: 16 -> j
		Demo: 17 -> k
		Demo: 18 -> l
	Page 2 (function X)
		Demo: 15 19 -> i i i
		Demo: 17 19 -> k k k
		Test: 16 19 -> j j j
		Test: 18 19 -> l l l
	Page 3 (function Y)	
		Demo: 15 20 16 -> i j i
		Demo: 15 20 17 -> i k i
		Test: 15 20 18 -> i l i
		Test: 17 20 18 -> k l k
	Page 4 (function Z)
		Demo: 15 21 16 -> j i
		Demo: 16 21 17 -> k i
		Test: 15 21 18 -> l i
		Test: 17 21 18 -> l k
	Page 5 (function combinations)
		Demo (15, 16): arg1 X Y arg2 -> (arg1 X) Y arg2 -> arg1 arg1 arg1 arg2 arg1 arg1 arg1
		Demo (15, 17): arg1 Y arg2 X -> arg1 Y (arg2 X) -> arg1 arg1 arg1 arg3 arg1 arg1 arg1
		Demo (15, 16): arg1 X Z arg2 -> (arg1 X) Z arg2 -> arg2 arg1 arg1 arg1
		Demo (15, 17): arg1 Z arg2 X -> arg1 Z (arg2 X) -> arg2 arg2 arg2 arg1
		Demo (15, 16, 17): arg1 Y arg2 Z arg3 -> (arg1 Y arg2) Z arg3 -> arg3 arg1 arg2 arg1
		Demo (15, 16, 17): arg1 Z arg2 Y arg3 -> arg1 Z (arg2 Y arg3) -> arg2 arg3 arg2 arg1
		Test (16, 17): arg1 X Y arg2 -> (arg1 X) Y arg2 -> arg1 arg1 arg1 arg2 arg1 arg1 arg1
		Test (17, 18): arg1 Y arg2 X -> arg1 Y (arg2 X) -> arg1 arg2 arg2 arg2 arg1
		Test (16, 17): arg1 X Z arg2 -> (arg1 X) Z arg2 -> arg2 arg1 arg1 arg1
		Test (17, 18): arg1 Z arg2 X -> arg1 Z (arg2 X) -> arg2 arg2 arg2 arg1
		Test (15, 17, 18): arg1 Y arg2 Z arg3 -> (arg1 Y arg2) Z arg3 -> arg3 arg1 arg2 arg1
		Test (16, 17, 18): arg1 Z arg2 Y arg3 -> arg1 Z (arg2 Y arg3) -> arg2 arg3 arg2 arg1
		Test (15, 16, 18): arg1 Y arg2 Z arg3 X -> (arg1 Y arg2) Z (arg3 X) -> arg3 arg3 arg3 arg1 arg2 arg1
		Test (15, 17, 18): arg1 X Z arg2 Y arg3 -> (arg1 X) Z (arg2 Y arg3) -> arg2 arg3 arg2 arg1 arg1 arg1
		Test (16, 17, 18): arg1 Z arg2 Y arg3 X -> arg1 Z (arg2 Y (arg3 X)) -> arg2 arg3 arg3 arg3 arg2 arg1





Universe
Word: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]
Emoji: [a, b, c, d, e, f, g, h]
Func: [F1, F2, F3, F4, F5, ..., F200?]

Holdout
[1, 2, 3, 4, 5, 6, 7,
a, b, c, d,
F1, F2, F3, F4]

Non-Holdout
[8, 9, 10, 11, 12, 13, 14,
e, f, g, h,
F5, F6, ..., F200]

Test Episode Grammar
choose all words from holdout: 1,2,3,4,5,6,7
choose all emojis from holdout: a,b,c,d
choose 3 func from 4 holdout: F1, F2, F3, F4
return random mapping: {word -> emoji/func}

Train Episode Grammar
try sample Bernoulli(p=0.25):
	if success:
		choose 1 func from 4 holdout
	elif sample Bernoulli(p=???) success:
		choose 1 word/emoji from holdout
	else:
		fail
if fail:
	choose all words from non-holdout
	choose all emojis from non-holdout
	choose 3 functions from non-holdout
else (success):
	if isinstance(sample)==word:
		choose 6 words from 7 non-holdout
		choose all emojis from non-holdout
		choose 3 func from non-holdout
	elif isinstance(sample)==emoji:
		choose all words from non-holdout
		choose 3 emojis from 4 non-holdout
		choose 3 func from non-holdout
	elif isinstance(sample)==func:
		choose all words from non-holdout
		choose all emojis from non-holdout
		choose 2 func from non-holdout
return random mapping: {word -> emoji/func}




1. I guarantee that the support contains trivial “input symbol → output symbol” examples for half of the output symbols in the grammar. This makes most episodes compositionally solvable.
2. I enforce a compositional holdout within each episode: The queries are constructed from items that are not seen together in the same support example. This makes the task harder (but still fair).
But I do guarantee that 25% of training episodes include a held-out concatenation function. So in the simulation I ran, where I held out 4 concatenation functions, each held-out function is expected to appear in 6,250 training episodes.

In the Lake and Baroni simulations (and therefore ours too) each episode contains several of these trivial queries. Very few episodes contain queries that use all three operations. Most use 2 operations.

I trained models on datasets with 30 and 35 output symbols, and found steadily decreasing accuracy for both i.i.d. and compositional test sets, as predicted. But there’s a lot of variance when the test set is only 200 samples, so I’m currently regenerating the datasets with test sets of 5000 samples and will re-train the models. My plan is to divide-and-conquer over the number of output symbols to identify the value where the model fails to converge. I should have some results in a week or so.

At 25 symbols, this change pushes query-level compositional generalization accuracy down to below 20% on non-trivial queries that have more than one input symbol.

I implemented a new compositional holdout strategy where, at 25 input and output symbols, query-level compositional test accuracy for nontrivial queries is 0%, and overall accuracy is 6%. This means that the model can only answer compositional test queries limited to a single item, and most of the time it can’t even do that. IID test accuracy is 86%, comparable to training accuracy.

I have a thought about the human subjects study. The important feature of the simulation we need to match is just the symbol assignments used in training are completely different than the ones used in testing. This means we don’t need to fully reproduce the method for generating grammars and episodes. We can just generate a few episodes that we know fit our criteria, and then randomize all of the symbols. I hope this takes some stress out of the process, and maybe makes some of your questions less urgent.

I successfully repeated the simulation study with a universe of 14 input symbols (nonsense words) and 8 output symbols (colors/emojis). This is the smallest universe where it is possible to generate both “all left-in” and “all held-out” grammars, given that each grammar contains 7 input symbols and 4 output symbols.
The multiway holdout used 7 input symbols, 4 output symbols, and 4 functions. The test set size was 2000 episodes. The only way the holdout size could get smaller is by reducing the number of held-out functions from 4 to 3, but this might require reducing the size of the test set.
Query-level training and IID generalization accuracy were at ~89%, and compositional generalization accuracy was at ~4% overall and ~0.1% for non-trivial queries.


The machine experiment includes hundreds of functions, but the holdout only contained 4. I don't know what they were off the top of my head, but I can check later. I think it's fine if we just use the 3 functions we've already been using with human subjects, because each episode in the machine experiment only uses 3 functions.

But there is one wrinkle: I think humans might be confused if the same symbols have different meanings in different episodes, and the Yichen’s proposal sidesteps this possibility by changing all of the symbols out each episode. I don’t think is a problem for our argument, but we might want to mention it and just say “that’s interesting but it’s not what we set out to study”.
