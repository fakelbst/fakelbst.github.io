import Vue from 'vue'
import style from './style.css'
import scrollbar from '../Components/scrollbar'

Vue.component('scrollbar', scrollbar)

export default {
  template: `<div>
    <div v-bind:class="style.wrap">
      <blockquote v-for="q in quotes">
        <p>{{q.quote}}</p>
        <p><cite>{{q.from}}</cite></p>
      </blockquote>
    </div>
    <scrollbar v-on:scrolling="toScroll" :sy="scrollValue" :h="fullHeight" v-show="$store.state.zoomCurrenView"></scrollbar>
   </div>`,
  data() {
    return {
      style,
      scrollValue: 0,
      fullHeight: 0,
      quotes: [
        {quote: 'Life moves pretty fast. If you don’t stop and look around once in a while, you could miss it.', from: 'Ferris Bueller’s Day Off'},
        {quote: 'Because the only people for me are the mad ones, the ones who are mad to live, mad to talk, mad to be saved, desirous of everything at the same time, the ones who never yawn or say a commonplace thing, but burn, burn, burn like fabulous yellow roman candles exploding like spiders across the stars and in the middle you see the blue centerlight pop and everybody goes “Awww!”', from: 'On the Road'},
        {quote: 'Some people hear their own inner voices with great clearness. And they live by what they hear. Such people become crazy, or they become legends.', from: 'Legends of the Fall'},
        {quote: 'If you end up with a boring, miserable life because you listened to your mom, your dad, your teacher, your priest, or some guy on television telling you how to do your shit, then you deserve it.', from: 'Frank Zappa'},
        {quote: "I've learned that people will forget what you said, people will forget what you did, but people will never forget how you made them feel.", from: 'Maya Angelou'},
        {quote: 'Again, you can’t connect the dots looking forward; you can only connect them looking backwards. So you have to trust that the dots will somehow connect in your future. You have to trust in something — your gut, destiny, life, karma, whatever. This approach has never let me down, and it has made all the difference in my life.', from: 'Steve Jobs'},
        {quote: 'Programming as an intellectual activity is the only art form that allows you to create interactive art. You can create projects that other people can play with, and you can talk to them indirectly. No other art form is quite this interactive. Movies flow to the audience in one direction. Paintings do not move. Code goes both ways.', from: 'Advice From An Old Programmer from Learn Python The Hard Way， 2nd Edition'},
        {quote: "The peculiar thing about programmers is that they're the one profession that can easily work remotely and travel, and yet they're the one profession that doesn't. Of course there are exceptions, but on my travels I didn't meet another programmer doing anything similar; a sad state of affairs. My message to fellow programmers is stop making excuses, man up and do it. You only live once, and I guarantee that you will have the time of your life.", from: 'Alex MacCaw Traveling, Writing and Programming'},
        {quote: 'Beauty is more important in computing than anywhere else in technology because software is so complicated. Beauty is the ultimate defense against complexity.', from: 'David Gelernter Machine Beauty: Elegance and the Heart of Technology'},
        {quote: "The fool didn't know it was impossible, so he did it."},
        {quote: 'Somewhere in the world someone is training when you are not. When you race him, he will win.', from: 'Tom Fleming'},
        {quote: 'I always wonder why birds stay in thr same place when they can fly anywhere on earth. Then I ask myself the same question.'},
        {quote: 'You have to do everything you can, you have to work your hardest, and if you do, if you stay positive, you have a shot at a silver lining.', from: 'Pat - Silver Linings Playbook'}
      ]
    }
  },
  methods: {
    toScroll (v) {
      this.scrollValue = v
    },
    // scrollHandler () {
    //   if(Math.abs(this.scrollValue) > (document.querySelector('[class*=__scroll-wrap__]').clientHeight - window.innerHeight) && this.loadingRead === false){
    //   }
    // }
  },
  updated () {
    this.fullHeight = this.$el.offsetHeight
  },
}

