import {css} from 'aphrodite/no-important'
import {ACTIONS, EVENTS} from 'message/src'
import {ua} from 'utils/src'
import BigScreen from 'isomorphic-bigscreen'
import React, {useContext, useEffect, useMemo, useRef, useState} from 'react'
import {
  defaultLocale,
  LocaleCode,
  PartialLocaleConfigMap,
} from '@/constants/locales'
import LocaleProvider from '@/contexts/LocaleProvider'
import {
  InternalMessageContext,
  MessageContextValue,
  MessageProvider,
} from '@/contexts/MessageContext'
import ObjectFitContext, {ObjectFit} from '@/contexts/ObjectFitContext'
import ObjectFitProvider from '@/contexts/ObjectFitProvider'
import PositionProvider from '@/contexts/PositionProvider'
import VideoSourceContext from '@/contexts/VideoSourceContext'
import VideoSourceProvider from '@/contexts/VideoSourceProvider'
import useBoolean from '@/hooks/useBoolean'
import useHandler from '@/hooks/useHandler'
import useMount from '@/hooks/useMount'
import usePrevious from '@/hooks/usePrevious'
import {
  PlaybackRate,
  PlaySourceMap,
  ProgressDot,
  ProgressValue,
  RealQuality,
  QualityOrder,
} from '../types'
import formatDuration from '@/utils/formatDuration'
import getBufferedTime from '@/utils/getBufferedTime'
import Pip from '@/utils/pip'
import storage from '@/utils/storage'
import {
    ActionToastOutlet,
    ActionToastProvider,
    useActionToastDispatch,
  } from './ActionToast'