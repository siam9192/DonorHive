import React, { UIEvent, useEffect, useRef, useState } from "react";
import { GoDotFill } from "react-icons/go";
import { PiBell, PiBellSimpleRinging } from "react-icons/pi";
import { useNavigate } from "react-router-dom";
import { getTimeAgo } from "../../utils/function";
import { useGetMyUtilsCountQuery } from "../../redux/features/utils/utils.api";
import {
  useGetMyNotificationsQuery,
  useSetAsReadMyAllNotificationsMutation,
} from "../../redux/features/notification/notification.api";
import { ENotificationType, INotification } from "../../types/notification.type";

const NotificationBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const [allNotifications, setAllNotifications] = useState<INotification[]>([]);
  const navigate = useNavigate();
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const bar = barRef.current;

    if (!bar) return;

    const handler2 = (event: MouseEvent) => {
      const target = event.target;
      if (!bar.contains(target as Node)) {
        setIsOpen(false);
      }
    };

    // bar.addEventListener("scroll", handler);
    document.addEventListener("mousedown", handler2);

    return () => {
      // bar.removeEventListener("scroll", handler);
      document.removeEventListener("mousedown", handler2);
    };
  }, [isOpen, barRef.current?.onscroll]);

  const {
    data: notificationData,
    isLoading: notificationsIsLoading,
    isFetching: notificationsIsRefetching,
    refetch,
  } = useGetMyNotificationsQuery(undefined);

  const notifications = notificationData?.data;
  const meta = notificationData?.meta;

  const [page, setPage] = useState(meta?.page || 1);

  const totalPage = meta ? Math.ceil(meta?.totalResult / meta?.limit) : 1;

  const handleOnScroll = (event: UIEvent<HTMLDivElement>) => {
    const target = event.target as HTMLDivElement; // Cast to HTMLDivElement

    if (target.scrollTop + target.clientHeight >= target.scrollHeight && meta && page < totalPage) {
      setTimeout(() => {
        setPage((p) => p + 1);
        refetch();
      }, 400);
    }
  };

  const { data } = useGetMyUtilsCountQuery(undefined);

  const newNotificationsTotal = data?.data.newNotificationsTotal;

  useEffect(() => {
    if (
      !notificationsIsLoading &&
      !notificationsIsRefetching &&
      notifications &&
      notifications.length
    ) {
      setAllNotifications((p) => [...p, ...notifications] as any);
    }
  }, [notificationsIsLoading, notificationsIsRefetching]);

  const handelOnClick = (notification: INotification) => {
    // if (notification.href) {
    //   navigate(notification.href);
    //   setIsOpen(false);
    // }
  };

  const [setReadAll] = useSetAsReadMyAllNotificationsMutation();

  useEffect(() => {
    if (isOpen) {
      setReadAll(undefined);
    }
  }, [isOpen]);

  function getTypeColor(type: ENotificationType) {
    let color;
    switch (type) {
      case ENotificationType.Info:
        color = "text-blue-500";
        break;
      case ENotificationType.Warning:
        color = "text-red-500";
    }
    return color;
  }

  return (
    <div className="relative">
      <button
        onClick={() => {
          setIsOpen((p) => !p);
        }}
        className="md:text-3xl text-2xl p-2  bg-gray-900 text-white rounded-full relative"
      >
        <PiBell />
        {newNotificationsTotal !== 0 && (
          <div className="size-5 flex justify-center items-center bg-red-500 rounded-full absolute  -top-1  right-0 text-[0.6rem] text-white">
            {newNotificationsTotal}
          </div>
        )}
      </button>

      {isOpen && (
        <div
          id="notification-bar"
          ref={barRef}
          onScroll={handleOnScroll}
          className="absolute right-0 w-60 h-60 z-40 overflow-y-auto no-scrollbar p-3 bg-white shadow-2xl  rounded-md "
        >
          <h3 className="text-xl font-semibold font-jost">Notifications</h3>
          {meta?.total === 0 ? (
            <div className="h-40 flex justify-center items-center">
              {" "}
              <p className="text-center text-sm -mt-10">No notifications</p>
            </div>
          ) : null}
          <div className=" mt-2">
            {allNotifications.map((notification, index) => {
              const typeColor = getTypeColor(notification.type);
              return (
                <div
                  key={index}
                  onClick={() => handelOnClick(notification)}
                  className="p-2 flex  gap-1 hover:bg-gray-50 hover:cursor-pointer z-50"
                >
                  <div className={`${!notification.isRead ? "text-red-600" : "text-green-600"}`}>
                    <span>
                      <GoDotFill />
                    </span>
                  </div>
                  <div>
                    <p className="text-gray-600 text-[0.8rem]">
                      {getTimeAgo(notification.createdAt)}{" "}
                      {notification.type ? (
                        <span className={`${typeColor} font-medium`}>({notification.type})</span>
                      ) : null}
                    </p>
                    <h2 className="text-[1rem] font-medium">{notification.title}</h2>
                    <p>{notification.message}</p>
                  </div>
                </div>
              );
            })}
          </div>
          {(notificationsIsLoading || notificationsIsRefetching) && (
            <p className="mt-1 text-gray-700 font-medium">Loading..</p>
          )}
        </div>
      )}
    </div>
  );
};

export default NotificationBar;
