export default function Lab1() {
    return (
        <div id="wd-lab1">
            <h2>Lab 1</h2>
            <h3>HTML Examples</h3>
            <div id="wd-h-tag">
                <h4>Heading Tags</h4>
                Text documents are often broken up into several sections and subsections. 
                Each section is usually prefaced with a short title or heading that attempts 
                to summarize the topic of the section it precedes. For instance this paragraph 
                is preceded by the heading Heading Tags. The font of the section headings are 
                usually larger and bolder than their subsection headings. This document uses 
                headings to introduce topics such as HTML Documents, HTML Tags, Heading Tags, etc. 
                HTML heading tags can be used to format plain text so that it renders in a browser as 
                large headings. There are 6 heading tags for different sizes: h1, h2, h3, h4, h5, and h6. 
                Tag h1 is the largest heading and h6 is the smallest heading.
            </div>
            <div id="wd-p-tag">
                <h4>Paragraph Tag</h4>
                {/* p tag is used to wrap the text and add vertical spacing between paragraphs. */}
                <p id="wd-p-1">
                    This is a paragraph. We often separate a long set of sentences with 
                    vertical spaces to make the text easier to read. Browsers ignore vertical 
                    white spaces and render all the text as one single set of sentences. To 
                    force the browser to add vertical spacing, wrap the paragraphs you want to 
                    separate with the paragraph tag
                </p>
                <p id="wd-p-2">
                    This is the first paragraph. The paragraph tag is used to format
                    vertical gaps between long pieces of text like this one.
                </p>
                <p id  = "wd-p-3">
                    This is the second paragraph. Even though there is a deliberate white
                    gap between the paragraph above and this paragraph, by default
                    browsers render them as one contiguous piece of text as shown here on
                    the right.
                </p>
                <p id = "wd-p-4">
                    This is the third paragraph. Wrap each paragraph with the paragraph
                    tag to tell browsers to render the gaps.
                </p>
            </div>
            <div id = "wd-lists">
                <h4>List Tags</h4>
                <h5>Ordered List</h5>
                How to make pancakes:
                <ol id = "wd-pancakes">
                    <li>Mix dry ingredients.</li>
                    <li>Add wet ingredients.</li>
                    <li>Stir to combine.</li>
                    <li>Heat a skillet or griddle.</li>
                    <li>Port batter onto the skillet.</li>
                    <li>Cook until bubbly on top.</li>
                    <li>Flip and cook the other side.</li>
                    <li>Serve and enjoy!</li>
                </ol>
                How to make shortcakes:
                <ol id = "wd-your-favorite-recipe">
                    <li>Preheat the oven to 450 degrees.</li>
                    <li>Sift flour, sugar, baking powder, salt together in a bowl.</li>
                    <li>Cut in butter with a pastry blender.</li>
                    <li>Beat together milk and egg in a different bowl.</li>
                    <li>Stir the milk and egg together into flour mixture.</li>
                    <li>Spread batter in the baking pan.</li>
                    <li>Bake in the oven about 15 minutes.</li>
                </ol>
                <h5>Unordered List Tag</h5>
                    My favorite books (in no particular order)
                    <ul id = "wd-my-books">
                        <li>Dune</li>
                        <li>Lord of the Rings</li>
                        <li>Ender's Game</li>
                        <li>Red Mars</li>
                        <li>The Forever War</li>
                    </ul>
                    Your favorite books (in no particular order
                    <ul id = "wd-your-books">
                        <li>Harry Potter</li>
                        <li>Do Androids Dream of Electric Sheep?</li>
                        <li>Atomic Habits</li>
                    </ul>
            </div>
        </div>
      
    );
  }
  