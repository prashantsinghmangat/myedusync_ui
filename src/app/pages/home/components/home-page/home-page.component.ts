import { Component, OnInit, AfterViewInit, ElementRef } from '@angular/core';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  standalone: true,
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit, AfterViewInit {
  constructor(private elRef: ElementRef) {}

  // This is required because your class implements OnInit
  ngOnInit(): void {
    // You can keep this method empty if you have nothing to initialize when the component is instantiated
  }

  ngAfterViewInit(): void {
    this.animateCounters();
  }

  private animateCounters(): void {
    const counters = this.elRef.nativeElement.querySelectorAll('[data-count]');
    counters.forEach((counter: any) => {
      const updateCount = () => {
        const target = +counter.getAttribute('data-count');
        const count = parseInt(counter.innerText, 10);
        const increment = target / 200;

        if (count < target) {
          counter.innerText = Math.ceil(count + increment);
          setTimeout(updateCount, 1);
        } else {
          counter.innerText = `${target}+`; // Ensure to add the '+' symbol only after reaching the target
        }
      };
      updateCount();
    });
  }
}
