X:1
T:Lyrics
N:see https://www.youtube.com/watch?v=RWNeCjid0zc
M:4/4
L:1/4
K:C
% use the w: field to add lyrics, with each word lined up on a note
A A A A | A A A A |
w:words line up on notes
%
% to align syllables on notes, use hyphens and/or spaces to split the words up
A A A A | A A A A |
w:syl-la-ble, syl- la- ble
%
% to align two (or more) syllables on a single note, don't split them up or use backslash hypen \-
A2  A2 | A2 A2 | 
w:syllable, syl\-la\-ble
%
% to align two (or more) words on a single note, use a tilde ~ between the words
A4 | A A A A | 
w:word~word syl-la-ble
%
% to align two (or more) notes on a syllable or word, use an underscore
A2  A2 | A A A A  | 
w:word_ syl-la-ble_
%
% to skip one (or more) notes, i.e. to include blank syllables, use an asterisk *
A A A A | A A A A |
w:word * * * syl-la-ble *
%
% to save typing in lots of asterisks, advance to the next barline with a bar symbol |
A A A A | A A A A |
w:word | syl-la-ble |
%
% to include multipe verses, use multiple w: fields
A A A A | A A A A |
w:syl-la-ble | syl- la- ble
w:word | syl-la-ble 
%
% to include more verses underneath use W: fields (upper case)
W: This is verse two of my song
W: Syl-la-ble, word
W: 
W: This is verse three of my song
W: Word, word, syl-la-ble!
W: 
%%writefields N