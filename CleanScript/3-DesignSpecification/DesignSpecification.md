ʕ⌐■ᴥ■ʔ: I'll create a detailed UX design specification document for CleanScript based on your PRD and design psychology principles. Let's make this clear and easy to follow!

# CleanScript UX Design Specification
**Version 1.0** | *Convert captions to clean text ready for AI*

## 1. Screen Specifications

### Landing Page
**Layout Structure:**
- Header with logo and minimal navigation
- Hero section with clear value proposition
- Single CTA (Call to Action) button
- Brief feature highlights (3 key benefits)
- Footer with minimal links

**Key UI Components:**
- Logo and brand header
- Hero illustration showing caption-to-text conversion
- Primary CTA button ("Convert Now")
- Secondary navigation (About, FAQ, Contact)
- Social proof section (user testimonials)

**Main User Actions:**
- Click primary CTA to start conversion
- Navigate to secondary pages
- Read testimonials/proof of concept

**Mobile vs Desktop Differences:**
- Mobile: Stacked layout with hamburger menu
- Desktop: Horizontal navigation with expanded feature highlights

### File Upload Screen
**Layout Structure:**
- Centered upload card/container
- Clear instructions above upload area
- File format requirements listed
- Progress indicator at top

**Key UI Components:**
- Drag-and-drop upload zone
- File browser button
- Supported file format indicators
- Back button
- Progress steps indicator

**Main User Actions:**
- Drag and drop VTT file
- Click to browse and select file
- Return to landing page

**Mobile vs Desktop Differences:**
- Mobile: Simplified upload zone, touch-optimized
- Desktop: Larger drop area with hover effects

### Processing Screen
**Layout Structure:**
- Central progress indicator
- Status message
- Animated icon/illustration
- Cancel button

**Key UI Components:**
- Circular progress indicator
- Processing status text
- Simple animation showing text cleaning
- Cancel processing button

**Main User Actions:**
- Wait for processing (passive)
- Cancel processing if needed

**Mobile vs Desktop Differences:**
- Nearly identical on both platforms
- Mobile: Slightly smaller animation

### Results Screen
**Layout Structure:**
- Success confirmation at top
- Text preview in scrollable container
- Download button prominent
- Secondary actions below
- "Process another file" option

**Key UI Components:**
- Success checkmark/confirmation
- Preview pane with cleaned text sample
- Primary download button
- Copy to clipboard button
- New conversion button
- Share results option

**Main User Actions:**
- Download cleaned text file
- Copy text to clipboard
- Start new conversion
- Share results

**Mobile vs Desktop Differences:**
- Mobile: Vertical layout, smaller preview area
- Desktop: Two-column layout with larger preview pane

### Error Screens
**Layout Structure:**
- Error icon/illustration
- Clear error message
- Suggested resolution steps
- Try again button

**Key UI Components:**
- Friendly error illustration
- Specific error message
- Numbered resolution steps
- Try again button
- Contact support link

**Main User Actions:**
- Read error message
- Follow resolution steps
- Try again with new file
- Contact support if needed

**Mobile vs Desktop Differences:**
- Consistent experience across platforms
- Mobile: Full-width messaging

## 2. Visual Style Recommendations

### Color Scheme

**Primary Colors:**
- Brand Pink: #E8518C (Primary brand color)
- Dark Navy: #2A2D43 (Text and accents)
- Soft White: #F8F9FA (Backgrounds)

**Secondary Colors:**
- Light Pink: #F9D5E5 (Secondary backgrounds, highlights)
- Mint Green: #4ECDC4 (Success states, accents)
- Soft Orange: #FF9F68 (Warning/attention elements)

**UI State Colors:**
- Success: #36B37E
- Error: #FF5C5C
- Processing: #3B82F6
- Inactive: #D1D5DB

### Typography Recommendations

**Headings:**
- Font Family: Poppins (Sans-serif)
- Weights: 600 (semibold) for headings, 700 (bold) for emphasis
- Sizes:
  - H1: 32px/24px (desktop/mobile)
  - H2: 24px/20px
  - H3: 20px/18px
  - H4: 18px/16px

**Body Text:**
- Font Family: Inter (Sans-serif)
- Weights: 400 (regular), 500 (medium) for emphasis
- Size: 16px/14px (desktop/mobile)
- Line height: 1.5

**Button Text:**
- Font Family: Inter
- Weight: 500 (medium)
- Size: 16px/14px (desktop/mobile)
- Letter spacing: 0.01em

**Rationale:**
Both Poppins and Inter offer excellent readability and accessibility while maintaining a modern, clean aesthetic. These sans-serif fonts reduce cognitive load (particularly important for users with ADHD) and maintain legibility across device sizes.

### UI Component Style: Soft UI / Flat Design Hybrid

I recommend a hybrid approach combining elements of flat design with subtle soft UI accents:

**Primary UI Elements:**
- Flat cards with subtle shadows (4-8px blur)
- Rounded corners (8px radius)
- Minimal borders (1px) for definition
- Generous whitespace (16-24px padding)

**Interactive Elements:**
- Buttons with subtle gradients and hover effects
- Elevation changes on interaction (2-4px)
- Micro-interactions for feedback (subtle animations)
- Clear focus states with brand pink outlines

**Icons & Illustrations:**
- Simple, outlined icons with 2px stroke weight
- Consistent corner radius
- Monochromatic with accent colors
- Avoid complex, detailed illustrations

**Rationale:**
This approach keeps the interface clean and focused (reducing cognitive load for ADHD users) while providing enough visual feedback through subtle depth cues. The minimal aesthetic ensures content remains the focus, aligning with the app's goal of simplicity.

## 3. Design Principles & Considerations

Based on design psychology principles, I recommend prioritizing:

### 1. Reducing Cognitive Load
- Limited choices per screen (Miller's Law - 5-9 items)
- Progressive disclosure of information
- Visual clarity through consistent patterns
- Clear hierarchy with focal points

### 2. Error Prevention & Recovery
- Proactive guidance on file requirements
- Clear feedback on errors
- Simple resolution paths
- Friendly, non-technical error messages

### 3. Instant Feedback
- Micro-interactions for immediate response
- Clear progress indicators
- Celebration of completed tasks
- Visual cues for successful actions

### 4. Focus Management
- Distraction-free interface
- High contrast for important elements
- Guided attention through visual hierarchy
- Limited animations to essential feedback

## 4. Implementation Notes

### Responsive Design Priorities
- Focus on mobile-first development
- Maintain consistent information hierarchy across breakpoints
- Simplify interactions for touch interfaces
- Ensure tap targets meet accessibility standards (min 44px)

### Accessibility Considerations
- Color contrast ratio of at least 4.5:1 for text
- Support for screen readers
- Keyboard navigation
- Alternative text for all visual elements
- Focus indicators for interactive elements

### Performance Optimization
- Lazy loading for non-critical elements
- Optimized animations (using CSS transforms)
- Efficient file handling
- Quick initial load (<2 seconds)

## 5. Design Success Metrics

To evaluate the effectiveness of this design, track:

1. Task completion rate (goal: >95%)
2. Time to first conversion (goal: <30 seconds for new users)
3. Error recovery rate (goal: >90%)
4. User satisfaction survey (goal: >4.5/5)
5. System Usability Scale score (goal: >80)

---

This design specification aligns with your target users' needs by:
1. Providing Alex (ADHD content creator) with a distraction-free, simple interface
2. Giving Professor Martinez a technically accessible solution
3. Enabling Mia to efficiently integrate clean text into her workflow

The design principles focus on reducing friction, providing clear feedback, and minimizing cognitive load—making the app accessible to non-technical users while maintaining professional effectiveness.