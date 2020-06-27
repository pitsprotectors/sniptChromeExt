# MVP for Snipt

**Thesis**: The web is filled with noise. How can we more effectively find and
organize the precisely necessary content that we need to learn, in a
collaborative environment? Snipt will provide the solution as an inquiry-based
learning assistant chrome extension based on spaced repetition techniques.

**Tentative Tech Stack**: React, GraphQL, Firebase.

### Tier 1

**Overview**: Allows users to save snippets of websites in question-answer format.

- user clicks extension and inputs a question
- user highlights snippet(s), which loads onto the question (bundle)
  \*saves the question-snippet to firebase DB via graphQL along with UR

### Tier 2

**Overview**: Application asks users their questions in spaced repetition intervals.

- website for analytics, landing page
- application “asks” the user their question, based on spaced repetition algorithm
- MEDIUM: notification, new tab extension, email? CHOOSE. customizable.
- user “answers” the question and tells application YES/NO based on ability to answer
- user can see answer (=== snippet) that was saved with the question
- application tweaks spaced repetition interval based on YES/NO

### Tier 3

**Overview**: Users can collaborate in their learning by real-time sharing their Q&A

- chat/room for users to share their question-snippet bundles
- user can ask a question, and another user can answer with a snippet
- user can add other website snippets to the questions
- share to social media

### Tier 4

**Overview**: Application will recommend users other users’ Q&A when interests overlap

- unsupervised machine learning clusters user snippet interests using NLP to recommend users relevant snippets
- machine learning takes user answer input to question and determines correctness and tweaks algorithm based on correctness precision level
- extension shows TLDR of websites based on other user-generated snippets
