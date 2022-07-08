import { FC } from "react"
import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { useTranslation } from "react-i18next"
import { ReactComponent as Logo } from "@assets/illa-logo.svg"
import {
  BugIcon,
  CaretRightIcon,
  MoreIcon,
  WindowBottomIcon,
  WindowLeftIcon,
  WindowRightIcon,
} from "@illa-design/icon"
import { Button, ButtonGroup } from "@illa-design/button"
import { PageNavBarProps } from "@/page/App/components/PageNavBar/interface"
import { configActions } from "@/redux/config/configSlice"
import {
  isOpenBottomPanel,
  isOpenLeftPanel,
  isOpenRightPanel,
} from "@/redux/config/configSelector"
import { getAppInfo } from "@/redux/currentApp/appInfo/appInfoSelector"
import {
  descriptionStyle,
  informationStyle,
  logoCursorStyle,
  nameStyle,
  navBarStyle,
  rowCenter,
  viewControlStyle,
  windowIconBodyStyle,
  windowIconStyle,
} from "./style"

export const PageNavBar: FC<PageNavBarProps> = (props) => {
  const { className } = props
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const appInfo = useSelector(getAppInfo)
  const leftPanelVisible = useSelector(isOpenLeftPanel)
  const rightPanelVisible = useSelector(isOpenRightPanel)
  const bottomPanelVisible = useSelector(isOpenBottomPanel)

  return (
    <div className={className} css={navBarStyle}>
      <div css={rowCenter}>
        <Logo
          width={"34px"}
          onClick={() => {
            navigate("/")
          }}
          css={logoCursorStyle}
        />
        <section css={informationStyle}>
          <div css={nameStyle}>{appInfo?.appName}</div>
          <div css={descriptionStyle}>{appInfo?.appActivity}</div>
        </section>
      </div>
      <div css={viewControlStyle}>
        <span css={windowIconBodyStyle}>
          <WindowLeftIcon
            _css={windowIconStyle(leftPanelVisible)}
            onClick={() => {
              dispatch(configActions.updateLeftPanel(!leftPanelVisible))
            }}
          />
        </span>
        <span css={windowIconBodyStyle}>
          <WindowRightIcon
            _css={windowIconStyle(rightPanelVisible)}
            onClick={() => {
              dispatch(configActions.updateRightPanel(!rightPanelVisible))
            }}
          />
        </span>
        <span css={windowIconBodyStyle}>
          <WindowBottomIcon
            _css={windowIconStyle(bottomPanelVisible)}
            onClick={() => {
              dispatch(configActions.updateBottomPanel(!bottomPanelVisible))
            }}
          />
        </span>
      </div>
      <div>
        <ButtonGroup spacing={"8px"}>
          <Button
            colorScheme="gray"
            size="medium"
            leftIcon={<BugIcon size="14px" />}
          />
          <Button
            colorScheme="gray"
            size="medium"
            leftIcon={<MoreIcon size="14px" />}
          />
          <Button
            colorScheme="techPurple"
            size="medium"
            leftIcon={<CaretRightIcon />}
            onClick={() => {
              navigate(
                `/deploy/app/${appInfo?.appId}/version/${appInfo?.appVersion}`,
              )
            }}
          >
            {t("deploy")}
          </Button>
        </ButtonGroup>
      </div>
    </div>
  )
}

PageNavBar.displayName = "PageNavBar"