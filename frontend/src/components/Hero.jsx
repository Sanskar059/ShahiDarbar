import { Link } from "react-router-dom";

function Hero() {
  return (
    <section className="w-full relative min-h-[80vh] flex items-center justify-center bg-surface-container-lowest overflow-hidden pt-24 pb-16">
      {/* Background Subtle Gradient */}
      <div className="absolute top-0 right-0 w-[50%] h-full bg-surface-container-low rounded-bl-[100px] -z-10"></div>
      
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        
        {/* Left Content */}
        <div className="flex flex-col gap-8 z-10 max-w-2xl">
          <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-luxury-gold/30 bg-luxury-gold/5 w-fit">
            <span className="w-2 h-2 rounded-full bg-luxury-gold animate-pulse"></span>
            <span className="text-xs font-bold text-luxury-gold uppercase tracking-widest">Premium Culinary Experience</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-on-surface uppercase tracking-tighter leading-[0.9]">
            Elevate <br/>
            <span className="text-on-surface-variant italic font-normal">Your</span> Dining.
          </h1>
          
          <p className="text-lg text-on-surface-variant max-w-lg leading-relaxed">
            Experience the finest local gastronomy delivered straight to your door with uncompromising quality and zero hidden fees.
          </p>
          
          <div className="w-full max-w-[500px] mt-4 relative group">
            <div className="absolute inset-0 bg-primary/5 rounded-full blur-xl group-hover:bg-primary/10 transition-colors duration-500"></div>
            <div className="relative bg-surface-container-lowest border border-outline-variant rounded-full flex items-center p-2 shadow-[0_10px_30px_rgba(0,0,0,0.04)] focus-within:shadow-[0_20px_50px_rgba(0,0,0,0.08)] transition-shadow duration-300">
              <span className="text-on-surface-variant ml-4 mr-2">📍</span>
              <input 
                className="flex-1 bg-transparent border-none outline-none text-sm font-bold text-on-surface placeholder:text-outline-variant uppercase h-12" 
                placeholder="ENTER YOUR ADDRESS" 
                type="text"
              />
              <Link to="/products" className="bg-luxury-gold text-primary font-bold uppercase px-8 h-12 rounded-full hover:opacity-90 transition-opacity shrink-0 flex items-center justify-center tracking-widest text-sm">
                Explore
              </Link>
            </div>
          </div>
          
          <div className="flex items-center gap-8 mt-6">
            <div className="flex flex-col">
              <span className="text-3xl font-bold text-on-surface">500+</span>
              <span className="text-xs text-on-surface-variant uppercase tracking-widest">Curated Dishes</span>
            </div>
            <div className="w-[1px] h-10 bg-outline-variant"></div>
            <div className="flex flex-col">
              <span className="text-3xl font-bold text-on-surface">24/7</span>
              <span className="text-xs text-on-surface-variant uppercase tracking-widest">White-Glove Delivery</span>
            </div>
          </div>
        </div>

        {/* Right Content - Image Composition */}
        <div className="relative h-[600px] w-full hidden lg:block z-10">
          {/* Main Large Image */}
          <div className="absolute top-0 right-0 w-[85%] h-[90%] rounded-[40px] overflow-hidden shadow-2xl border-4 border-surface-container-lowest z-10 hover:scale-[1.02] transition-transform duration-700">
            <img 
              src="https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=2069&auto=format&fit=crop" 
              alt="Premium Steak" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/60 via-transparent to-transparent"></div>
          </div>

          {/* Floating Image 1 */}
          <div className="absolute bottom-0 left-0 w-[45%] h-[45%] rounded-[30px] overflow-hidden shadow-2xl border-4 border-surface-container-lowest z-20 hover:scale-105 transition-transform duration-500">
            <img 
              src="https://images.unsplash.com/photo-1559847844-5315695dadae?q=80&w=2058&auto=format&fit=crop" 
              alt="Fresh Salad" 
              className="w-full h-full object-cover"
            />
          </div>

          {/* Floating Badge */}
          <div className="absolute top-20 -left-10 bg-surface-container-lowest border border-outline-variant shadow-xl rounded-2xl p-4 flex items-center gap-4 z-30 animate-bounce" style={{animationDuration: '3s'}}>
            <div className="w-12 h-12 rounded-full bg-luxury-gold/20 flex items-center justify-center text-2xl">
              ⭐
            </div>
            <div>
              <p className="text-sm font-bold text-on-surface uppercase tracking-widest">Top Rated</p>
              <p className="text-xs text-on-surface-variant">By Local Critics</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;

