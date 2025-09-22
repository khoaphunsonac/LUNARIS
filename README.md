# LUNARIS - E-commerce Platform

Modern Vietnamese fashion e-commerce platform built with Next.js 14, TypeScript, and Tailwind CSS.

## Features

### 🛍️ **E-commerce Functionality**
- Product catalog with categories and search
- Shopping cart with persistent storage
- Wishlist functionality
- Product detail pages with image galleries
- Product filtering and sorting

### 💳 **Advanced Checkout System**
- **Customer Information Form** with validation
- **Delivery Date/Time Selection** (minimum 2 hours from order)
- **Multiple Payment Methods:**
  - Cash on Delivery
  - VNPay QR Code (Simulated)
  - Credit/Debit Card (Simulated)
- **Payment Success Notifications**
- **Order Confirmation** with delivery details

### 🎨 **Modern UI/UX**
- Responsive design for all devices
- Clean, modern Vietnamese interface
- Smooth animations and transitions
- Loading states and error handling
- Toast notifications

### 🛠️ **Technical Features**
- Server-side rendering with Next.js 14
- TypeScript for type safety
- Tailwind CSS for styling
- Shadcn/ui component library
- Local storage for cart/wishlist persistence

## Live Demo

🌐 **[View Live Demo](https://khoaphunsonac.github.io/LUNARIS/)**

## Screenshots

### Homepage
![Homepage](public/images/shop.jpg)

### Checkout Process
- Customer information form with validation
- Payment method selection (Cash, VNPay, Card)
- Payment success confirmations
- Order completion flow

## Installation

1. Clone the repository:
```bash
git clone https://github.com/khoaphunsonac/LUNARIS.git
cd LUNARIS
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
lunaris-ecommerce/
├── app/                    # Next.js 14 App Router
│   ├── cart/              # Shopping cart page
│   ├── product/[id]/      # Dynamic product pages
│   ├── shop/              # Product catalog
│   └── ...
├── components/            # Reusable UI components
│   ├── checkout-dialog.tsx # Advanced checkout system
│   ├── product-card.tsx   # Product display component
│   └── ui/                # Shadcn/ui components
├── lib/                   # Utilities and contexts
│   ├── cart-context.tsx   # Shopping cart state
│   ├── wishlist-context.tsx # Wishlist state
│   └── data-manager.ts    # Data management
└── public/               # Static assets
    ├── data/             # JSON data files
    └── images/           # Product images
```

## Technologies Used

- **Framework:** Next.js 14 with App Router
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **UI Components:** Shadcn/ui, Radix UI
- **Icons:** Lucide React
- **Date Handling:** date-fns
- **Development:** ESLint, PostCSS

## Key Features Implementation

### Checkout System
The checkout system includes:
- Multi-step form (Customer Info → Payment → Processing → Complete)
- Real-time validation with error messages
- Payment method simulation with loading states
- Success notifications with transaction details
- Auto-format for phone numbers and credit cards

### Payment Methods
1. **Cash on Delivery** - Simple order placement
2. **VNPay QR** - QR code simulation with 3-second processing
3. **Credit Card** - Full card form with validation and 2-second processing

### State Management
- React Context for cart and wishlist
- Local storage persistence
- Optimistic updates for better UX

## Deployment

The project is configured for easy deployment:

- **Vercel** (Recommended): Connect your GitHub repo to Vercel
- **Netlify**: Use the build command `npm run build`
- **GitHub Pages**: Configure static export if needed

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is open source and available under the [MIT License](LICENSE).

## Contact

- **Developer:** Khoa Phung
- **GitHub:** [@khoaphunsonac](https://github.com/khoaphunsonac)
- **Project Link:** [https://github.com/khoaphunsonac/LUNARIS](https://github.com/khoaphunsonac/LUNARIS)

---

⭐ If you found this project helpful, please give it a star on GitHub!