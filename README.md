# Avail Challenge Problem

Given a sentence without punctuation as a string, subdivide the string, encrypt each word, and encrypt again by joining each encrypted word together until only one single encrypted string remains.

```
Input: The dog jumped over the fence too
 
Pass 1: 1asado 12313rf a2q34rfq2r qav3t4t33q4 w3g456y54wyyw45 qf2fa2f2q5 q23fvatw
Pass 2: encrypt (1asado 12313rf) + encrypt (a2q34rfq2r qav3t4t33q4) + ...
Pass 3: encrypt (wffqd3r4q rdqdqq4q) + encrypt (td3qtdrdr2d tr3tdqqtd3ard)
Pass 4: encrypt (awerq2f3r324v q2rq3rdr)
```

### Overview of Implementation

I used a recursive algorithm approach which takes in an array of words and recursively subdivides the array until only a single word is left within each array. At this point I encrypt the word, and on the returning bubble, each word is joined and encrypted with it's pair. This leaves a single encrypted word on the final return bubble.

### Prerequisites

- NodeJS

### Installation

```
npm install
```

### Run Tests

To run the tests run the command below:
```
npm test
```

### Why?

Encryption is used to obscure data from outside viewers. This example can be described as an "Onion" encryption. In practice, you could have each layer of the onion use a unique encryption key which would allow no single entity the ability to fully decrypt the data. At a high level, this is somewhat similar to how the tor "Onion" network works.
