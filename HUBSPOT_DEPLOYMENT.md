# 🚀 HubSpot Deployment Guide: AI Efficiency Pilot Calculator

## 📋 Overview
This guide will help you deploy the AI Efficiency Pilot Calculator as a custom module in HubSpot, making it available for use on any page, blog post, or landing page.

## 📁 Generated Files
Your HubSpot module has been generated in the `hubspot-module/` folder:

```
hubspot-module/
├── module.html     # Main template with inlined CSS/JS
├── module.json     # Module configuration and metadata
└── fields.json     # Editable fields for content editors
```

## 🔧 Deployment Steps

### Step 1: Access HubSpot Design Manager
1. Log into your HubSpot account
2. Go to **Marketing** > **Files and Templates** > **Design Manager**
3. Navigate to **Custom Modules** or create a new folder

### Step 2: Upload the Module
1. Click **Upload** > **Upload files**
2. Select all files from the `hubspot-module/` folder:
   - `module.html`
   - `module.json` 
   - `fields.json`
3. Upload them to the same directory in Design Manager

### Step 3: Create/Name the Module
1. The module will be automatically recognized as "AI Efficiency Pilot Calculator"
2. It will appear in your Custom Modules list
3. You can rename or organize it as needed

### Step 4: Use the Module
1. Go to any **Page**, **Blog Post**, or **Landing Page**
2. Edit the page in the HubSpot page editor
3. Click **Add Module** or the **+** button
4. Search for "AI Efficiency Pilot Calculator"
5. Drag and drop it onto your page

## ⚙️ Module Configuration

The module includes these editable fields:

### 📝 Content Fields
- **Calculator Title**: Main heading (default: "AI Value Calculator")
- **Calculator Subtitle**: Descriptive text below title
- **Show SmarterX Logo**: Toggle logo display on/off
- **Custom CSS**: Add custom styling overrides

### 🎨 Styling Options
The module inherits your HubSpot theme styles but includes:
- Professional calculator interface
- Responsive design for mobile/desktop
- Print-friendly PDF export functionality
- SmarterX branding (can be hidden)

## 🔍 Testing Your Module

### Pre-deployment Checklist:
- ✅ Module uploads without errors
- ✅ Calculator loads and displays properly
- ✅ Individual calculator functions work
- ✅ Team calculator functions work
- ✅ PDF export opens print dialog
- ✅ Responsive design works on mobile
- ✅ Module fields (title, subtitle) update correctly

### Test Scenarios:
1. **Basic Functionality**: Fill out forms and generate results
2. **PDF Export**: Click "Export PDF" and verify print dialog
3. **Mobile Responsive**: Test on different screen sizes
4. **HubSpot Integration**: Verify it works with your theme

## 🎯 Advanced Configuration

### Custom Styling
Add custom CSS in the "Custom CSS" field to match your brand:

```css
.ai-calculator-wrapper {
  --primary: #your-brand-color;
  --calculator-gray-900: #your-text-color;
}

.ai-calculator-wrapper .bg-primary {
  background-color: var(--primary) !important;
}
```

### Logo Replacement
To use your own logo instead of SmarterX:
1. Upload your logo to HubSpot File Manager
2. Edit the `module.html` file
3. Replace the logo URL with your file's HubSpot URL

## 📊 Monitoring & Analytics

### HubSpot Analytics
- Track page views where the calculator is embedded
- Monitor engagement and conversion metrics
- Use HubSpot's built-in analytics tools

### Google Analytics
- Calculator interactions will be tracked automatically
- PDF exports trigger as events
- Page engagement metrics available

## 🔧 Troubleshooting

### Common Issues:

**Module doesn't appear in module list:**
- **File Naming**: Ensure files are named exactly:
  - `module.html` (not Module.html or module.HTML)
  - `module.json` (not module.JSON)
  - `fields.json` (not fields.JSON)
- **Same Directory**: All 3 files must be in the same folder
- **Wait Time**: Allow 2-3 minutes for HubSpot to process the module
- **Refresh**: Refresh the Design Manager and page editor
- **Browser Cache**: Try in incognito/private mode

**Still not showing? Try these steps:**
1. **Check file contents**: Open each file in Design Manager to ensure they uploaded correctly
2. **Re-upload**: Delete all 3 files and re-upload them together
3. **Folder structure**: Create a new folder called "ai-calculator" and upload files there
4. **Module validation**: HubSpot may show validation errors in Design Manager

**Alternative Upload Method:**
1. In Design Manager, click **Actions** > **Create Module**
2. Name it "AI Efficiency Pilot Calculator"
3. Copy/paste the contents from your local files:
   - Copy `module.html` content into the HTML editor
   - Copy `fields.json` content into the Fields editor
   - Save the module

**Calculator doesn't load:**
- Check browser console for JavaScript errors
- Verify module is placed in a content area
- Ensure page template supports custom modules

**Styling looks broken:**
- Check for CSS conflicts with theme
- Add custom CSS overrides as needed
- Test in incognito mode to rule out caching

**PDF export not working:**
- Modern browsers required (Chrome, Firefox, Safari, Edge)
- Popup blockers may interfere
- Users need to select "Save as PDF" in print dialog

## 📞 Support

For technical issues:
1. Check HubSpot's Custom Module documentation
2. Test in different browsers
3. Verify all files uploaded correctly
4. Contact your HubSpot administrator

## 🎉 Success!

Once deployed, your AI Efficiency Pilot Calculator will be available as a professional, branded tool that can be easily added to any HubSpot page. Users can calculate AI ROI and export their results as PDFs, providing significant value to your website visitors.

---

**Built with ❤️ for Marketing AI Institute**  
*Professional AI consulting and ROI calculation tools*