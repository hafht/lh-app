import {Component} from "@angular/core";

@Component({
  selector: 'cf-app-page-not-available',
  template: `
    <main class="grid h-screen min-h-full place-items-center px-6 py-24 sm:py-32 lg:px-8">
      <div class="text-center">
        <h1 class="mt-4 text-3xl font-bold tracking-tight text-white sm:text-5xl">Sorry!</h1>
        <p class="mt-6 text-base leading-7 text-gray-600">The app cannot load on browser.</p>
        <div class="mt-10 flex items-center justify-center gap-x-6">
          <a href="#" class="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm
          hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2
          focus-visible:outline-indigo-600">Go to desktop app</a>
        </div>
      </div>
    </main>
  `,
  standalone: true
})
export class PageNotAvailableComponent {}
