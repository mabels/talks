require 'enumerator'

def distil_wifi_ap(cn)
  cn.region.hosts.add('wifi-ap', "flavour" => "mikrotik") do |ap|
    ap.configip = ap.id ||= Construqt::HostId.create do |my|
      my.interfaces << cn.region.interfaces.add_bridge(ap, "bridge-local",
      "mtu" => 1500, "address" => cn.network.addresses.add_ip("192.168.88.1/24"),
      "interfaces" => [
        cn.region.interfaces.add_device(ap, "ether2", "mtu" => 1500, "default_name" => "ether2"),
        master_if = cn.region.interfaces.add_wlan(ap, "wlan1", "mtu" => 1500,
          "default_name" => "wlan1", "band" => "2ghz-b/g/n", "hide_ssid" => true,
          "channel_width" => "20/40mhz-Ce", "country" => "germany",
          "mode" => "ap-bridge", "rx_chain" => "0,1", "tx_chain" => "0,1",
          "ssid" => Digest::SHA256.hexdigest("wifi-geheim")[0..12],
          "psk" => Digest::SHA256.hexdigest("wifi-geheim")[12..28])]+
        (["wifi-con", "wifi-struqt"].map.with_index(300).map do |ssid, vlan|
          cn.region.interfaces.add_wlan(ap, "wl#{vlan}", "mtu" => 1500, "vlan_id" => vlan,
          "master_if" => master_if, "ssid" => ssid.upcase, "psk" => "#{ssid}-#{vlan}")
        end))
  	end
  end
end
