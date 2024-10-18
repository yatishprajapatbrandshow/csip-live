"use client";
import { Fragment, useRef, useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useDebouncedCallback } from 'use-debounce'
import clsx from 'clsx'
import { CircleUserRound, BellPlus, MenuIcon, MoveUpLeft, UserIcon } from 'lucide-react';
import { AppScreen } from './AppScreen';
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react';

function InviteScreen(props) {
  const MotionAppScreenHeader = motion(AppScreen.Header)
  const MotionAppScreenBody = motion(AppScreen.Body)
  return (
    <div className={clsx('flex flex-col', "w-full")}>
      <div className="flex justify-between px-4 pt-4">
        <MenuIcon className="h-6 w-6 flex-none text-white" />
        <UserIcon className="h-6 w-6 flex-none text-white" />
      </div>
      <MotionAppScreenHeader {...(props.animated ? headerAnimation : {})}>
        <AppScreen.Title>Invite people</AppScreen.Title>
        <AppScreen.Subtitle>
          Get tips <span className="text-white">5s sooner</span> for every
          invite.
        </AppScreen.Subtitle>
      </MotionAppScreenHeader>
      <MotionAppScreenBody
        {...(props.animated ? { ...bodyAnimation, custom: props.custom } : {})}
      >
        <div className="px-4 py-6">
          <div className="space-y-6">
            {[
              { label: 'Full name', value: 'Atul Sadiwal' },
              { label: 'Email address', value: 'atul.xtt@gmail.com' },
            ].map((field) => (
              <div key={field.label}>
                <div className="text-sm text-gray-500">{field.label}</div>
                <div className="mt-2 border-b border-gray-200 pb-2 text-sm text-gray-900">
                  {field.value}
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 rounded-lg bg-cyan-500 px-3 py-2 text-center text-sm text-white">
            Invite person
          </div>
        </div>
      </MotionAppScreenBody>
    </div>
  )
}

const headerAnimation = {
  initial: { opacity: 0, transition: { duration: 0.3 } },
  animate: { opacity: 1, transition: { duration: 0.3, delay: 0.3 } },
  exit: { opacity: 0, transition: { duration: 0.3 } },
}

const bodyAnimation = {
  initial: 'initial',
  animate: 'animate',
  exit: 'exit',
  variants: {
    initial: (custom, ...props) =>
      custom.isForwards
        ? bodyVariantForwards(custom, ...props)
        : bodyVariantBackwards,
    animate: (custom) => ({
      y: '0%',
      opacity: 1,
      scale: 1,
      zIndex: maxZIndex / 2 - custom.changeCount,
      filter: 'blur(0px)',
      transition: { duration: 0.4 },
    }),
    exit: (custom, ...props) =>
      custom.isForwards
        ? bodyVariantBackwards
        : bodyVariantForwards(custom, ...props),
  },
}

const maxZIndex = 2147483647

const bodyVariantBackwards = {
  opacity: 0.4,
  scale: 0.8,
  zIndex: 0,
  filter: 'blur(4px)',
  transition: { duration: 0.4 },
}

const bodyVariantForwards = (custom) => ({
  y: '100%',
  zIndex: maxZIndex - custom.changeCount,
  transition: { duration: 0.4 },
})

const features = [
  {
    name: 'Invite friends for better returns',
    description:
      'For every friend you invite to Pocket, you get insider notifications 5 seconds sooner. And it’s 10 seconds if you invite an insider.',
    icon: CircleUserRound,
    screen: InviteScreen,
  },
  {
    name: 'Notifications on stock dips',
    description:
      'Get a push notification every time we find out something that’s going to lower the share price on your holdings so you can sell before the information hits the public markets.',
    icon: BellPlus,
    screen: InviteScreen,
  },
  {
    name: 'Invest what you want',
    description:
      'We hide your stock purchases behind thousands of anonymous trading accounts, so suspicious activity can never be traced back to you.',
    icon: MoveUpLeft,
    screen: InviteScreen,
  },
]

function usePrevious(selectedIndex) {
  let ref = useRef()

  useEffect(() => {
    ref.current = selectedIndex
  }, [selectedIndex])

  return ref.current
}

export default function PrimaryFeatures() {
  const [activeIndex, setActiveIndex] = useState(0)
  const slideContainerRef = useRef(null)
  const slideRefs = useRef([])
  const [changeCount, setChangeCount] = useState(0)
  const [selectedIndex, setSelectedIndex] = useState(0)
  const prevIndex = usePrevious(selectedIndex);
  const isForwards = prevIndex === undefined ? true : selectedIndex > prevIndex

  const onChange = useDebouncedCallback(
    (selectedIndex) => {
      setSelectedIndex(selectedIndex)
      setChangeCount((changeCount) => changeCount + 1)
    },
    100,
    { leading: true },
  )

  useEffect(() => {
    const observer = new window.IntersectionObserver(
      (entries) => {
        for (let entry of entries) {
          if (entry.isIntersecting && entry.target instanceof HTMLDivElement) {
            setActiveIndex(slideRefs.current.indexOf(entry.target))
            break
          }
        }
      },
      {
        root: slideContainerRef.current,
        threshold: 0.6,
      },
    )

    for (let slide of slideRefs.current) {
      if (slide) {
        observer.observe(slide)
      }
    }

    return () => {
      observer.disconnect()
    }
  }, [slideContainerRef, slideRefs])

  return (
    <section
      aria-label="Features for investing all your money"
      className="py-20 sm:py-20 my-10"
    >
      <section className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
        <div className="mx-auto max-w-3xl lg:mx-0 lg:max-w-3xl">
          <h2 className="text-4xl tracking-tight text-white">
            Every feature you need to win. <br /> Try it for yourself.
          </h2>
          <p className="mt-2 text-lg leading-6 text-gray-400">
            Pocket was built for investors like you who play by their own rules
            and aren’t going to let SEC regulations get in the way of their
            dreams. If other investing tools are afraid to build it, Pocket has
            it.
          </p>
        </div>
      </section>
      <div className="mt-16 md:hidden">
        <>
          <div
            ref={slideContainerRef}
            className="-mb-4 flex snap-x snap-mandatory -space-x-4 overflow-x-auto overscroll-x-contain scroll-smooth pb-4 [scrollbar-width:none] sm:-space-x-6 [&::-webkit-scrollbar]:hidden"
          >
            {features.map((feature, featureIndex) => (
              <div
                key={featureIndex}
                ref={(ref) => ref && (slideRefs.current[featureIndex] = ref)}
                className="w-full flex-none snap-center px-4 sm:px-6"
              >
                <div className="relative transform overflow-hidden rounded-2xl bg-gray-800 px-5 py-6">
                  <div className={clsx('relative aspect-[366/729]', "relative mx-auto w-full max-w-[366px]")}>
                    <div className="absolute inset-y-[calc(1/729*100%)] left-[calc(7/729*100%)] right-[calc(5/729*100%)] rounded-[calc(58/366*100%)/calc(58/729*100%)] shadow-2xl" />
                    <div className="absolute left-[calc(23/366*100%)] top-[calc(23/729*100%)] grid h-[calc(686/729*100%)] w-[calc(318/366*100%)] transform grid-cols-1 overflow-hidden bg-gray-900 pt-[calc(23/318*100%)]">
                      <feature.screen />
                    </div>
                    <svg viewBox="0 0 366 729" aria-hidden="true" className="pointer-events-none absolute inset-0 h-full w-full fill-gray-100"><path fill="#F2F2F2" fillRule="evenodd" clipRule="evenodd" d="M300.092 1c41.22 0 63.223 21.99 63.223 63.213V184.94c-.173.184-.329.476-.458.851.188-.282.404-.547.647-.791.844-.073 2.496.257 2.496 2.157V268.719c-.406 2.023-2.605 2.023-2.605 2.023a7.119 7.119 0 0 1-.08-.102v394.462c0 41.213-22.001 63.212-63.223 63.212h-95.074c-.881-.468-2.474-.795-4.323-.838l-33.704-.005-.049.001h-.231l-.141-.001c-2.028 0-3.798.339-4.745.843H66.751c-41.223 0-63.223-21.995-63.223-63.208V287.739c-.402-.024-2.165-.23-2.524-2.02v-.973A2.039 2.039 0 0 1 1 284.62v-47.611c0-.042.001-.084.004-.126v-.726c0-1.9 1.652-2.23 2.496-2.157l.028.028v-16.289c-.402-.024-2.165-.23-2.524-2.02v-.973A2.039 2.039 0 0 1 1 214.62v-47.611c0-.042.001-.084.004-.126v-.726c0-1.9 1.652-2.23 2.496-2.157l.028.028v-26.041a2.26 2.26 0 0 0 .093-.236l-.064-.01a3.337 3.337 0 0 1-.72-.12l-.166-.028A2 2 0 0 1 1 135.62v-24.611a2 2 0 0 1 1.671-1.973l.857-.143v-44.68C3.528 22.99 25.53 1 66.75 1h233.341ZM3.952 234.516a5.481 5.481 0 0 0-.229-.278c.082.071.159.163.228.278Zm89.99-206.304A4.213 4.213 0 0 0 89.727 24H56.864C38.714 24 24 38.708 24 56.852v618.296C24 693.292 38.714 708 56.864 708h250.272c18.15 0 32.864-14.708 32.864-32.852V56.852C340 38.708 325.286 24 307.136 24h-32.864a4.212 4.212 0 0 0-4.213 4.212v2.527c0 10.235-8.3 18.532-18.539 18.532H112.48c-10.239 0-18.539-8.297-18.539-18.532v-2.527Z" /><rect x="154" y="29" width="56" height="5" rx="2.5" fill="#D4D4D4" /></svg>
                    <img src='/images/phone-frame.svg' alt="phone-frame" className="pointer-events-none absolute inset-0 h-full w-full" unoptimized priority="false" />
                  </div>
                  <div className="absolute inset-x-0 bottom-0 bg-gray-800/95 p-6 backdrop-blur sm:p-10">
                    <feature.icon className="h-8 w-8" />
                    <h3 className="mt-6 text-sm font-semibold text-white sm:text-lg">
                      {feature.name}
                    </h3>
                    <p className="mt-2 text-sm text-gray-400">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 flex justify-center gap-3">
            {features.map((_, featureIndex) => (
              <button
                type="button"
                key={featureIndex}
                className={clsx(
                  'relative h-0.5 w-4 rounded-full',
                  featureIndex === activeIndex ? 'bg-gray-300' : 'bg-gray-500',
                )}
                aria-label={`Go to slide ${featureIndex + 1}`}
                onClick={() => {
                  slideRefs.current[featureIndex].scrollIntoView({
                    block: 'nearest',
                    inline: 'nearest',
                  })
                }}
              >
                <span className="absolute -inset-x-1.5 -inset-y-3" />
              </button>
            ))}
          </div>
        </>
      </div>
      <section className="hidden md:mt-20 md:block mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <TabGroup
          className="grid grid-cols-12 items-center gap-8 lg:gap-16 xl:gap-24"
          selectedIndex={selectedIndex}
          onChange={onChange}
          vertical
        >
          <TabList className="relative z-10 order-last col-span-6 space-y-6">
            {features.map((feature, featureIndex) => (
              <div
                key={feature.name}
                className="relative rounded-2xl transition-colors hover:bg-gray-700/30"
              >
                {featureIndex === selectedIndex && (
                  <motion.div
                    layoutId="activeBackground"
                    className="absolute inset-0 bg-gray-700"
                    initial={{ borderRadius: 16 }}
                  />
                )}
                <div className="relative z-10 p-8">
                  <feature.icon className={`h-8 w-8 ${featureIndex === selectedIndex ? 'text-white' : 'text-gray-300'}`} />
                  <h3 className="mt-6 text-lg font-semibold text-white">
                    <Tab className={`text-left  ui-not-focus-visible:outline-none outline-none ${featureIndex === selectedIndex ? 'text-white' : 'text-white/80'}`}>
                      <span className="absolute inset-0 rounded-2xl" />
                      {feature.name}
                    </Tab>
                  </h3>
                  <p className="mt-2 text-sm text-gray-400">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </TabList>
          <div className="relative col-span-6">
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
              <svg viewBox="0 0 558 558" width="558" height="558" fill="none" aria-hidden="true" className="animate-spin-slower"><defs><linearGradient x1="79" y1="16" x2="105" y2="237" gradientUnits="userSpaceOnUse"><stop stopColor="#13B5C8" /><stop offset="1" stopColor="#13B5C8" stopOpacity="0" /></linearGradient></defs><path opacity=".2" d="M1 279C1 125.465 125.465 1 279 1s278 124.465 278 278-124.465 278-278 278S1 432.535 1 279Z" stroke="#13B5C8" /><path d="M1 279C1 125.465 125.465 1 279 1" strokeLinecap="round" /></svg>
            </div>
            <div className={clsx('relative aspect-[366/729]', "z-10 mx-auto w-full max-w-[366px]")}>
              <div className="absolute inset-y-[calc(1/729*100%)] left-[calc(7/729*100%)] right-[calc(5/729*100%)] rounded-[calc(58/366*100%)/calc(58/729*100%)] shadow-2xl" />
              <div className="absolute left-[calc(23/366*100%)] top-[calc(23/729*100%)] grid h-[calc(686/729*100%)] w-[calc(318/366*100%)] transform grid-cols-1 overflow-hidden bg-gray-900 pt-[calc(23/318*100%)]">
                <TabPanels as={Fragment}>
                  <AnimatePresence
                    initial={false}
                    custom={{ isForwards, changeCount }}
                  >
                    {features.map((feature, featureIndex) =>
                      selectedIndex === featureIndex ? (
                        <TabPanel
                          static
                          key={feature.name + changeCount}
                          className="col-start-1 row-start-1 flex focus:outline-offset-[32px] ui-not-focus-visible:outline-none"
                        >
                          <feature.screen
                            animated
                            custom={{ isForwards, changeCount }}
                          />
                        </TabPanel>
                      ) : null,
                    )}
                  </AnimatePresence>
                </TabPanels>
              </div>
              <svg viewBox="0 0 366 729" aria-hidden="true" className="pointer-events-none absolute inset-0 h-full w-full fill-gray-100">
                <path
                  fill="#F2F2F2"
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M300.092 1c41.22 0 63.223 21.99 63.223 63.213V184.94c-.173.184-.329.476-.458.851.188-.282.404-.547.647-.791.844-.073 2.496.257 2.496 2.157V268.719c-.406 2.023-2.605 2.023-2.605 2.023a7.119 7.119 0 0 1-.08-.102v394.462c0 41.213-22.001 63.212-63.223 63.212h-95.074c-.881-.468-2.474-.795-4.323-.838l-33.704-.005-.049.001h-.231l-.141-.001c-2.028 0-3.798.339-4.745.843H66.751c-41.223 0-63.223-21.995-63.223-63.208V287.739c-.402-.024-2.165-.23-2.524-2.02v-.973A2.039 2.039 0 0 1 1 284.62v-47.611c0-.042.001-.084.004-.126v-.726c0-1.9 1.652-2.23 2.496-2.157l.028.028v-16.289c-.402-.024-2.165-.23-2.524-2.02v-.973A2.039 2.039 0 0 1 1 214.62v-47.611c0-.042.001-.084.004-.126v-.726c0-1.9 1.652-2.23 2.496-2.157l.028.028v-26.041a2.26 2.26 0 0 0 .093-.236l-.064-.01a3.337 3.337 0 0 1-.72-.12l-.166-.028A2 2 0 0 1 1 135.62v-24.611a2 2 0 0 1 1.671-1.973l.857-.143v-44.68C3.528 22.99 25.53 1 66.75 1h233.341ZM3.952 234.516a5.481 5.481 0 0 0-.229-.278c.082.071.159.163.228.278Zm89.99-206.304A4.213 4.213 0 0 0 89.727 24H56.864C38.714 24 24 38.708 24 56.852v618.296C24 693.292 38.714 708 56.864 708h250.272c18.15 0 32.864-14.708 32.864-32.852V56.852C340 38.708 325.286 24 307.136 24h-32.864a4.212 4.212 0 0 0-4.213 4.212v2.527c0 10.235-8.3 18.532-18.539 18.532H112.48c-10.239 0-18.539-8.297-18.539-18.532v-2.527Z"
                />
                <rect x="154" y="29" width="56" height="5" rx="2.5" fill="#D4D4D4" />
              </svg>
            </div>
          </div>
        </TabGroup>
      </section>
    </section>
  )
}