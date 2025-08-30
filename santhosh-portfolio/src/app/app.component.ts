import { Component, OnInit, OnDestroy, HostListener, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser, ViewportScroller } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { trigger, state, style, transition, animate, keyframes } from '@angular/animations';

interface Skill {
  name: string;
  percentage: number;
}

interface Project {
  title: string;
  description: string;
  image: string;
  tags: string[];
}

interface ContactInfo {
  title: string;
  value: string;
  icon: string;
  link: string;
  target?: string;
}

interface Particle {
  x: number;
  delay: number;
  size: number;
}

interface FormData {
  name: string;
  email: string;
  message: string;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  animations: [
    trigger('fadeInUp', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(30px)' }),
        animate('0.6s ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ]),
    trigger('slideInLeft', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateX(-100px)' }),
        animate('0.8s ease-out', style({ opacity: 1, transform: 'translateX(0)' }))
      ])
    ]),
    trigger('slideInRight', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateX(100px)' }),
        animate('0.8s ease-out', style({ opacity: 1, transform: 'translateX(0)' }))
      ])
    ]),
    trigger('slideInUp', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(50px)' }),
        animate('0.6s ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ]),
    trigger('scaleIn', [
      transition(':enter', [
        style({ opacity: 0, transform: 'scale(0.8)' }),
        animate('0.5s ease-out', style({ opacity: 1, transform: 'scale(1)' }))
      ])
    ])
  ]
})
export class AppComponent implements OnInit, OnDestroy {
  activeSection: string = '';
  isMenuOpen: boolean = false;
  isScrolled: boolean = false;
  particles: Particle[] = [];

  programmingLanguages: Skill[] = [
    { name: 'Swift', percentage: 95 },
    { name: 'Objective-C', percentage: 75 },
    { name: 'Java', percentage: 80 },
    { name: 'JavaScript', percentage: 85 }
  ];

  frameworks: Skill[] = [
    { name: 'UIKit', percentage: 95 },
    { name: 'SwiftUI', percentage: 90 },
    { name: 'Combine', percentage: 85 },
    { name: 'Core Data', percentage: 80 },
    { name: 'Firebase', percentage: 85 },
    { name: 'MapKit', percentage: 75 }
  ];

  tools: Skill[] = [
    { name: 'Xcode', percentage: 95 },
    { name: 'Git', percentage: 90 },
    { name: 'SourceTree', percentage: 85 },
    { name: 'Instruments', percentage: 80 },
    { name: 'TestFlight', percentage: 85 },
    { name: 'App Store Connect', percentage: 90 }
  ];

  backendSkills: string[] = [
    'Node.js', 'Express', 'Fastify', 'Prisma', 'MongoDB', 'PostgreSQL', 'REST APIs', 'GraphQL'
  ];

  projects: Project[] = [
    {
      title: 'Food Network Kitchen',
      description: 'A comprehensive iOS app featuring server-side driven UI architecture and live cooking classes. Built with advanced Swift patterns and real-time streaming capabilities.',
      image: 'https://via.placeholder.com/500x300/667eea/ffffff?text=Food+Network',
      tags: ['Swift', 'UIKit', 'Combine', 'Server-driven UI', 'WebRTC', 'AVFoundation']
    },
    {
      title: 'Dekoder News App',
      description: 'Modern news application built entirely with SwiftUI, featuring clean MVVM architecture, offline reading, and personalized content recommendations.',
      image: 'https://via.placeholder.com/500x300/764ba2/ffffff?text=Dekoder+News',
      tags: ['SwiftUI', 'MVVM', 'Combine', 'Core Data', 'REST API', 'Push Notifications']
    },
    {
      title: 'HealthTracker Pro',
      description: 'Comprehensive health and fitness tracking app with HealthKit integration, custom workout plans, and detailed analytics dashboard.',
      image: 'https://via.placeholder.com/500x300/ff6b6b/ffffff?text=HealthTracker',
      tags: ['SwiftUI', 'HealthKit', 'Charts', 'Core ML', 'CloudKit', 'WatchOS']
    }
  ];

  contactInfo: ContactInfo[] = [
    {
      title: 'Email',
      value: 'ssanthoshp159@gmail.com',
      icon: 'fas fa-envelope',
      link: 'mailto:ssanthoshp159@gmail.com'
    },
    {
      title: 'LinkedIn',
      value: 'Santhosh Patkar',
      icon: 'fab fa-linkedin',
      link: 'https://linkedin.com/in/santhosh-patkar',
      target: '_blank'
    },
  ];

  private intersectionObserver?: IntersectionObserver;
ssanthoshp159: any;

  constructor(private viewportScroller: ViewportScroller,@Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.generateParticles();
      this.updateScrollState();
      this.setupIntersectionObserver();
    }
  }

  ngOnDestroy(): void {
    if (this.intersectionObserver) {
      this.intersectionObserver.disconnect();
    }
  }

  @HostListener('window:scroll', ['$event'])
  onWindowScroll(): void {
    this.updateScrollState();
  }

  @HostListener('window:resize', ['$event'])
  onWindowResize(): void {
    this.generateParticles();
  }

  private updateScrollState(): void {
    this.isScrolled = window.scrollY > 50;
  }

  private generateParticles(): void {
    this.particles = [];
    if (isPlatformBrowser(this.platformId)) {
      // your browser-specific logic involving `window`
      const width = window.innerWidth;

      const particleCount = Math.min(50, Math.floor(width / 20));

      for (let i = 0; i < particleCount; i++) {
        this.particles.push({
          x: Math.random() * width,
          delay: Math.random() * 15,
          size: Math.random() * 4 + 2
        });
      }
    }
  }

  private setupIntersectionObserver(): void {
    const sections = document.querySelectorAll('.section');
    const options = {
      root: null,
      rootMargin: '-50px 0px -50px 0px',
      threshold: 0.3
    };

    this.intersectionObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.activeSection = entry.target.id;
          
          // Trigger animations for skill progress bars
          if (entry.target.id === 'skills') {
            this.animateSkillBars();
          }
        }
      });
    }, options);

    sections.forEach(section => {
      if (this.intersectionObserver) {
        this.intersectionObserver.observe(section);
      }
    });
  }

  private animateSkillBars(): void {
    setTimeout(() => {
      const progressBars = document.querySelectorAll('.progress-fill');
      progressBars.forEach((bar, index) => {
        const element = bar as HTMLElement;
        element.style.animation = `progressAnimation 1.5s ease-out ${index * 0.1}s forwards`;
      });
    }, 200);
  }

  scrollToSection(section: string): void {
    if (isPlatformBrowser(this.platformId)) {
      this.activeSection = section;
      debugger
      setTimeout(() => {
        const element = document.getElementById(section);
        const navbarOffset = 100;

        if (element) {
          const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
          const offsetPosition = elementPosition - navbarOffset;

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }

        // Close mobile menu if open
        if (this.isMenuOpen) {
          this.toggleMenu();
        }
      }, 1);
    }
  }

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
    
    // Prevent body scroll when menu is open
    if (this.isMenuOpen) {
      const sections = document.querySelectorAll('.nav-links');
      sections.forEach(section => {
        (section as HTMLElement).style.display = 'block';
      });
    } else {
        const sections = document.querySelectorAll('.nav-links');
         sections.forEach(section => {
        (section as HTMLElement).style.display = 'none';
      });
    }
    console.log(this.isMenuOpen)
  }

  // Utility method for getting progress width (if needed)
  getProgressWidth(percentage: number): string {
    return `${percentage}%`;
  }
}